import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col, Alert } from "react-bootstrap";
import { useLinks } from "../context/LinkContext";
import { useCampaigns } from "../context/CampaignContext";
import { useAuth } from "../../auth/hooks/useAuth";
import { accessElf } from "../../auth/utils/accessElf";

import PageLayout from "../../auth/components/pagelayout";
import PageMenu from "../components/pagemenu";
import { Bar } from "react-chartjs-2";

const LinkGraphPage = () => {
  const { linkId } = useParams();

  console.log("LinkGraphPage linkId", linkId);

  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    links,
    loading: linksLoading,
    addLink,
    updateLink,
    deleteLink,
    activeLinkId, setActiveLinkId, linkClicksData,
    activeLink
  } = useLinks();


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
    accessElf.track("link", linkId);
  }, [linkId]);

  useEffect(() => {
    if (linkId) {
      setActiveLinkId(parseInt(linkId));
    }
  }, [linkId, setActiveLinkId]);

  if (!activeLink && linkClicksData.length === 0) {
    return (
      <PageLayout>
        <PageMenu />
        <Container>
          <p>Loading link history...</p>
        </Container>
      </PageLayout>
    );
  }

  console.log("Link Graph Page Rendered", activeLink, linkClicksData.length);

  
  const reversedData = [...linkClicksData].reverse(); 

  const data = {
    labels: reversedData.map((entry) => entry.click_date),
    datasets: [
      {
        label: "Clicks",
        data: reversedData.map((entry) => entry.unique_clicks),
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  console.log("Link Graph Data", data);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          // Force whole numbers only
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
      },
    },
  };

  return (
    <PageLayout>
      <PageMenu />
      <Container>
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1>{activeLink?.name ?? "Link"}</h1>
                <p>Link Clicks</p>
              </div>
              <div>
                <Button
                  variant="outline-secondary"
                  className="me-2"
                  onClick={() => navigate(-1)}
                >
                  Back to Campaigns
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        
      <Alert variant="info" className="mb-4">
        Under Active Development! This page is currently under development. Some features may not be fully functional yet.
      </Alert>
        <Bar data={data} options={options} />
        
      </Container>
    </PageLayout>
  );
};

export default LinkGraphPage;
