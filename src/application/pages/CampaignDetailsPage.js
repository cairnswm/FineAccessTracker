import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useLinks } from "../context/LinkContext";
import { useCampaigns } from "../context/CampaignContext";
import { useAuth } from "../../auth/hooks/useAuth";
import { accessElf } from "../../auth/utils/accessElf";

import PageLayout from "../../auth/components/pagelayout";
import PageMenu from "../components/pagemenu";
import LinkTable from "../components/links/linktable";
import LinkModal from "../components/links/linkmodal";
import CampaignDashboard from "../components/campaignDashboard";

const CampaignLinksPage = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    links,
    loading: linksLoading,
    fetchLinks,
    addLink,
    updateLink,
    deleteLink,
  } = useLinks();

  const {
    campaigns,
    loading: campaignsLoading,
    getCampaign,
    setActiveCampaignById,
  } = useCampaigns();

  const [campaign, setCampaign] = useState(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [formData, setFormData] = useState({
    short_code: "",
    destination: "",
    title: "",
    expires_at: "",
  });

  useEffect(() => {
    accessElf.track("campaign", campaignId);
  }, [campaignId]);

  useEffect(() => {
    if (campaignId) {
      setActiveCampaignById(parseInt(campaignId));
    }
  }, [campaignId, setActiveCampaignById]);

  useEffect(() => {
    if (campaignId && campaigns.length > 0) {
      const foundCampaign = getCampaign(parseInt(campaignId));
      if (foundCampaign) {
        setCampaign(foundCampaign);
      } else {
        // Campaign not found, redirect to links page
        navigate("/links");
      }
    }
  }, [campaignId, campaigns, getCampaign, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();

    const linkData = {
      user_id: user.id,
      campaign_id: parseInt(campaignId),
      short_code: formData.short_code,
      destination: formData.destination,
      title: formData.title,
      expires_at: formData.expires_at
        ? new Date(formData.expires_at).toISOString()
        : null,
    };

    if (editingLink) {
      await updateLink(editingLink.id, linkData);
    } else {
      await addLink(linkData);
    }

    setShowLinkModal(false);
    setEditingLink(null);
    setFormData({
      short_code: "",
      destination: "",
      title: "",
      expires_at: "",
    });
  };

  const openEditLink = (link) => {
    setEditingLink(link);
    setFormData({
      short_code: link.short_code,
      destination: link.destination,
      title: link.title,
      expires_at: link.expires_at
        ? new Date(link.expires_at).toISOString().split("T")[0]
        : "",
    });
    setShowLinkModal(true);
  };

  const handleDeleteLink = async (id) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      await deleteLink(id);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString();
  };

  const getClickCount = (link) => {
    return link.clicks ? link.clicks.length : 0;
  };

  const getCampaignName = (campaignId) => {
    const foundCampaign = campaigns.find((c) => c.id === campaignId);
    return foundCampaign ? foundCampaign.name : "Unknown Campaign";
  };

  if (campaignsLoading || !campaign) {
    return (
      <PageLayout>
        <PageMenu />
        <Container>
          <p>Loading campaign...</p>
        </Container>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageMenu />
      <Container>
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1>{campaign.name}</h1>
                <p>Campaign Links</p>
              </div>
              <div>
                <Button
                  variant="outline-secondary"
                  className="me-2"
                  onClick={() => navigate("/links")}
                >
                  Back to Campaigns
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <CampaignDashboard campaignId={campaignId} />
        <Button
          variant="primary"
          onClick={() => {
            setEditingLink(null);
            setFormData({
              short_code: "",
              destination: "",
              title: "",
              expires_at: "",
            });
            setShowLinkModal(true);
          }}
        >
          Add New Link
        </Button>
        <LinkTable
          links={links}
          getCampaignName={getCampaignName}
          getClickCount={getClickCount}
          formatDate={formatDate}
          onEditLink={openEditLink}
          onDeleteLink={handleDeleteLink}
        />
        {/* Link Modal */}
        <LinkModal
          show={showLinkModal}
          onHide={() => setShowLinkModal(false)}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleLinkSubmit}
          campaigns={campaigns}
          isEditing={!!editingLink}
          selectedCampaignId={parseInt(campaignId)}
        />
      </Container>
    </PageLayout>
  );
};

export default CampaignLinksPage;
