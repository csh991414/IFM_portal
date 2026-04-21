export const colors = {
  // 배경
  bg: '#F4F5F8',
  surface: '#FFFFFF',
  surfaceAlt: '#FAFAFA',
  
  // 사이드바
  sidebar: '#0B1829',
  sidebarBorder: '#1A2D42',
  sidebarText: '#6B8CAE',
  sidebarActive: '#1A2D42',
  
  // 텍스트
  textPrimary: '#191F28',
  textSecondary: '#4E5968',
  textMuted: '#9EA7B4',
  textLabel: '#6B7684',
  
  // 테두리
  border: '#EAECF0',
  borderLight: '#F2F3F5',
  
  // 주요 색상
  primary: '#1B66FF',
  primaryBg: '#EBF3FF',
  
  // 상태 색상
  success: '#00C37D',
  successBg: '#E6F9F2',
  error: '#F04452',
  errorBg: '#FDECEA',
  warning: '#FF8B00',
  warningBg: '#FFF4E0',
  inactive: '#9EA7B4',
  inactiveBg: '#F2F3F5',
};

export const protocolColors = {
  REST:  { bg: '#EBF3FF', text: '#1B66FF',  dot: '#1B66FF' },
  SOAP:  { bg: '#F3EEFF', text: '#7B3FF2',  dot: '#7B3FF2' },
  MQ:    { bg: '#FFF3E0', text: '#E67000',  dot: '#E67000' },
  Batch: { bg: '#E8F5E9', text: '#1E8B4F',  dot: '#1E8B4F' },
  SFTP:  { bg: '#FFF0F0', text: '#D63B3B',  dot: '#D63B3B' },
};

export const statusMap = {
  active:   { label: '정상',  color: '#00C37D', bg: '#E6F9F2' },
  error:    { label: '오류',  color: '#F04452', bg: '#FDECEA' },
  warning:  { label: '경고',  color: '#FF8B00', bg: '#FFF4E0' },
  inactive: { label: '비활성', color: '#9EA7B4', bg: '#F2F3F5' },
};

export const fonts = {
  sans: "'Noto Sans KR', -apple-system, sans-serif",
  mono: "'JetBrains Mono', 'Courier New', monospace",
};
