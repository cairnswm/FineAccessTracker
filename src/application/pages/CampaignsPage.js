import React, { useState } from "react";
import { Row, Col, Alert, Button } from "react-bootstrap";
import { useCampaigns } from "../context/CampaignContext";
import { useLinks } from "../context/LinkContext";
import { useAuth } from "../../auth/hooks/useAuth";
import { useApplications } from "../context/ApplicationContext";

import PageLayout from "../../auth/components/pagelayout";
import PageMenu from "../components/pagemenu";
import CampaignsTab from "../components/links/campaignstab";
import CampaignModal from "../components/links/campaignmodal";
import { accessElf } from "../../auth/utils/accessElf";
import { PlusLg } from "react-bootstrap-icons";

const CampaignsPage = () => {
  const { user } = useAuth();
  const { applications } = useApplications();
  const {
    campaigns,
    loading: campaignsLoading,
    addCampaign,
    updateCampaign,
    deleteCampaign,
  } = useCampaigns();
  const { links } = useLinks();

  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    application_id: "",
  });
  accessElf.track("campaigns");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCampaignSubmit = async (e) => {
    e.preventDefault();

    const campaignData = {
      name: formData.name,
      user_id: user.id,
      application_id: parseInt(formData.application_id),
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
    });
  };

  const openEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      name: campaign.name,
      application_id: campaign.application_id.toString(),
    });
    setShowCampaignModal(true);
  };

  const handleDeleteCampaign = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this campaign? This will also delete all associated links."
      )
    ) {
      await deleteCampaign(id);
    }
  };

  const getApplicationName = (applicationId) => {
    const application = applications.find((a) => a.id === applicationId);
    return application ? application.name : "Unknown Application";
  };

  return (
    <PageLayout>
      <PageMenu />
      <Row className="mb-4 align-items-center">
        <Col>
          <h1>Campaign Management</h1>
          <p>Create and manage your campaigns</p>
        </Col>
        <Col className="text-end">
          <Button
            variant="primary"
            onClick={() => {
              setEditingCampaign(null);
              setFormData({
                name: "",
                application_id:
                  applications.length > 0 ? applications[0].id.toString() : "",
              });
              setShowCampaignModal(true);
            }}
          >
            <PlusLg className="me-2" />
            Add Campaign
          </Button>
        </Col>
      </Row>
      <Alert variant="info" className="mb-4">
        Under Active Development! This page is currently under development. Some features may not be fully functional yet.
      </Alert>

      <CampaignsTab
        campaigns={campaigns}
        campaignsLoading={campaignsLoading}
        links={links}
        getApplicationName={getApplicationName}
        openAddCampaign={() => {
          setEditingCampaign(null);
          setFormData({
            name: "",
            application_id:
              applications.length > 0 ? applications[0].id.toString() : "",
          });
          setShowCampaignModal(true);
        }}
        openEditCampaign={openEditCampaign}
        handleDeleteCampaign={handleDeleteCampaign}
      />

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
    </PageLayout>
  );
};

export default CampaignsPage;
