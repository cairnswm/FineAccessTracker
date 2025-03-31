import React, { useState, useEffect } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useCampaigns } from "../context/CampaignContext";
import { useLinks } from "../context/LinkContext";
import { useAuth } from "../../auth/hooks/useAuth";
import { useApplications } from "../context/ApplicationContext";

// Import components
import LinksTab from "../components/links/linkstab";
import CampaignsTab from "../components/links/campaignstab";
import CampaignModal from "../components/links/campaignmodal";
import LinkModal from "../components/links/linkmodal";

const LinksPage = () => {
  const { user } = useAuth();
  const { applications } = useApplications();
  const { campaigns, loading: campaignsLoading, addCampaign, updateCampaign, deleteCampaign } = useCampaigns();
  const { links, loading: linksLoading, fetchLinks, addLink, updateLink, deleteLink } = useLinks();

  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [editingLink, setEditingLink] = useState(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    application_id: "",
    short_code: "",
    destination: "",
    title: "",
    expires_at: ""
  });

  useEffect(() => {
    if (selectedCampaignId) {
      fetchLinks(selectedCampaignId);
    } else {
      fetchLinks();
    }
  }, [selectedCampaignId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCampaignSubmit = async (e) => {
    e.preventDefault();
    
    const campaignData = {
      name: formData.name,
      user_id: user.id,
      application_id: parseInt(formData.application_id)
    };
    
    if (editingCampaign) {
      await updateCampaign(editingCampaign.id, campaignData);
    } else {
      await addCampaign(campaignData);
    }
    
    setShowCampaignModal(false);
    setEditingCampaign(null);
    setFormData({
      name: "",
      application_id: "",
      short_code: "",
      destination: "",
      title: "",
      expires_at: ""
    });
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    
    const linkData = {
      user_id: user.id,
      campaign_id: selectedCampaignId || formData.campaign_id,
      short_code: formData.short_code,
      destination: formData.destination,
      title: formData.title,
      expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null
    };
    
    if (editingLink) {
      await updateLink(editingLink.id, linkData);
    } else {
      await addLink(linkData);
    }
    
    setShowLinkModal(false);
    setEditingLink(null);
    setFormData({
      name: "",
      application_id: "",
      short_code: "",
      destination: "",
      title: "",
      expires_at: ""
    });
  };

  const openEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      name: campaign.name,
      application_id: campaign.application_id.toString()
    });
    setShowCampaignModal(true);
  };

  const openEditLink = (link) => {
    setEditingLink(link);
    setFormData({
      campaign_id: link.campaign_id,
      short_code: link.short_code,
      destination: link.destination,
      title: link.title,
      expires_at: link.expires_at ? new Date(link.expires_at).toISOString().split("T")[0] : ""
    });
    setShowLinkModal(true);
  };

  const handleDeleteCampaign = async (id) => {
    if (window.confirm("Are you sure you want to delete this campaign? This will also delete all associated links.")) {
      await deleteCampaign(id);
      if (selectedCampaignId === id) {
        setSelectedCampaignId(null);
      }
    }
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
    const campaign = campaigns.find(c => c.id === campaignId);
    return campaign ? campaign.name : "Unknown Campaign";
  };

  const getApplicationName = (applicationId) => {
    const application = applications.find(a => a.id === applicationId);
    return application ? application.name : "Unknown Application";
  };

  return (
    <Container fluid className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>Link Management</h1>
          <p>Create and manage your short links and campaigns</p>
        </Col>
      </Row>

      <Tabs defaultActiveKey="links" className="mb-4">
        <Tab eventKey="links" title="Links">
          <LinksTab 
            links={links}
            linksLoading={linksLoading}
            campaigns={campaigns}
            selectedCampaignId={selectedCampaignId}
            setSelectedCampaignId={setSelectedCampaignId}
            getCampaignName={getCampaignName}
            getClickCount={getClickCount}
            formatDate={formatDate}
            openAddLink={() => {
              setEditingLink(null);
              setFormData({
                campaign_id: selectedCampaignId || "",
                short_code: "",
                destination: "",
                title: "",
                expires_at: ""
              });
              setShowLinkModal(true);
            }}
            openEditLink={openEditLink}
            handleDeleteLink={handleDeleteLink}
          />
        </Tab>

        <Tab eventKey="campaigns" title="Campaigns">
          <CampaignsTab 
            campaigns={campaigns}
            campaignsLoading={campaignsLoading}
            links={links}
            getApplicationName={getApplicationName}
            openAddCampaign={() => {
              setEditingCampaign(null);
              setFormData({
                name: "",
                application_id: applications.length > 0 ? applications[0].id.toString() : ""
              });
              setShowCampaignModal(true);
            }}
            openEditCampaign={openEditCampaign}
            handleDeleteCampaign={handleDeleteCampaign}
            handleViewCampaignLinks={(campaignId) => {
              setSelectedCampaignId(campaignId);
              document.querySelector('button[data-bs-target="#links"]').click();
            }}
          />
        </Tab>
      </Tabs>

      {/* Campaign Modal */}
      <CampaignModal 
        show={showCampaignModal}
        onHide={() => setShowCampaignModal(false)}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleCampaignSubmit}
        applications={applications}
        isEditing={!!editingCampaign}
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
        selectedCampaignId={selectedCampaignId}
      />
    </Container>
  );
};

export default LinksPage;
