interface WebhookEvent {
  sender: {
    id: string;
  };
  message: {
    text: string;
  };
  recipient: {
    id: string;
  };
  referral: {
    source: string;
    type: string;
    ref: string;
    referer_uri: string;
    is_guest_user: string;
    ads_context_data: AdsContextData;
  };
}

interface AdsContextData {
  product_id: string;
  post_id: string;
  video_url: string;
  photo_url: string;
  ad_title: string;
}

interface Entry {
  messaging: WebhookEvent[];
}

export interface Body {
  object: string;
  entry: Entry[];
}
