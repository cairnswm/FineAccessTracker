const mockLinks = [
  {
    id: 1,
    user_id: 1,
    campaign_id: 1,
    short_code: "sum25",
    destination: "https://example.com/summer-sale",
    title: "Summer Sale 2025 Landing Page",
    expires_at: "2025-09-30T23:59:59Z",
    clicks: [
      {
        id: 1,
        link_id: 1,
        ip_address: "192.168.1.1",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        referer: "https://google.com",
        created_at: "2025-06-15T14:30:45Z"
      },
      {
        id: 2,
        link_id: 1,
        ip_address: "192.168.1.2",
        user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1",
        referer: "https://facebook.com",
        created_at: "2025-06-15T15:12:33Z"
      }
    ]
  },
  {
    id: 2,
    user_id: 1,
    campaign_id: 1,
    short_code: "sum25fb",
    destination: "https://example.com/summer-sale?source=facebook",
    title: "Summer Sale 2025 - Facebook",
    expires_at: "2025-09-30T23:59:59Z",
    clicks: [
      {
        id: 3,
        link_id: 2,
        ip_address: "192.168.1.3",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        referer: "https://facebook.com",
        created_at: "2025-06-16T09:45:12Z"
      }
    ]
  },
  {
    id: 3,
    user_id: 1,
    campaign_id: 2,
    short_code: "launch",
    destination: "https://example.com/new-product",
    title: "Product Launch Page",
    expires_at: "2025-12-31T23:59:59Z",
    clicks: []
  },
  {
    id: 4,
    user_id: 1,
    campaign_id: 3,
    short_code: "news",
    destination: "https://example.com/newsletter",
    title: "Newsletter Signup",
    expires_at: "2026-01-31T23:59:59Z",
    clicks: [
      {
        id: 4,
        link_id: 4,
        ip_address: "192.168.1.4",
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
        referer: "https://email.provider.com",
        created_at: "2025-06-17T11:22:05Z"
      },
      {
        id: 5,
        link_id: 4,
        ip_address: "192.168.1.5",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        referer: "https://email.provider.com",
        created_at: "2025-06-17T12:15:30Z"
      },
      {
        id: 6,
        link_id: 4,
        ip_address: "192.168.1.6",
        user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1",
        referer: "https://email.provider.com",
        created_at: "2025-06-17T14:05:22Z"
      }
    ]
  }
];

export default mockLinks;
