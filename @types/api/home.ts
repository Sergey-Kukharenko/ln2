export interface DownloadAppBannerResponse
  extends ApiResponse<{
    title: string;
    description: string;
    link: string;
    icon: string;
  }> {}
