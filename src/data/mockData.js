export const MOCK_INTERFACES = [
  { id:'IF-001', name:'금감원 보고 연계',      system:'금감원',       protocol:'REST',  method:'POST', status:'active',   tps:12, errRate:0.1, latency:42,  target:'/api/report/submit' },
  { id:'IF-002', name:'제휴사 계약정보 수신',  system:'A생명보험',   protocol:'SOAP',  method:'POST', status:'active',   tps:3,  errRate:0.4, latency:110, target:'wsdl:ContractService' },
  { id:'IF-003', name:'보험료 청구 배치',      system:'내부 ERP',    protocol:'Batch', method:'SFTP', status:'active',   tps:0,  errRate:0,   latency:0,   target:'/batch/claim/daily' },
  { id:'IF-004', name:'MQ 알림 발송',          system:'내부 알림서버', protocol:'MQ',  method:'PUT',  status:'active',   tps:28, errRate:0.0, latency:8,   target:'QUEUE.NOTIFY.SEND' },
  { id:'IF-005', name:'재보험사 데이터 전송',  system:'뮌헨RE',      protocol:'SFTP',  method:'PUT',  status:'error',    tps:0,  errRate:100, latency:0,   target:'/outbound/reinsurance' },
  { id:'IF-006', name:'코어시스템 정산',       system:'내부 계정계', protocol:'REST',  method:'GET',  status:'active',   tps:45, errRate:0.2, latency:31,  target:'/core/settlement/daily' },
  { id:'IF-007', name:'손해사정 연계',         system:'B손해보험',   protocol:'SOAP',  method:'POST', status:'warning',  tps:6,  errRate:3.2, latency:320, target:'wsdl:ClaimAdjust' },
  { id:'IF-008', name:'심사결과 수신',         system:'내부 심사시스템', protocol:'MQ', method:'GET', status:'active',  tps:9,  errRate:0.0, latency:15,  target:'QUEUE.REVIEW.RESULT' },
  { id:'IF-009', name:'외부 신용조회',         system:'NICE',        protocol:'REST',  method:'POST', status:'active',   tps:4,  errRate:0.5, latency:87,  target:'/credit/inquiry' },
  { id:'IF-010', name:'국세청 원천징수',       system:'국세청',      protocol:'Batch', method:'SFTP', status:'inactive', tps:0,  errRate:0,   latency:0,   target:'/batch/tax/withholding' },
];

export const MOCK_LOGS = Array.from({ length: 100 }, (_, i) => {
  const levels = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
  const level = levels[Math.floor(Math.random() * levels.length)];
  const txId = `TX-${100000 + i}`;
  const iface = MOCK_INTERFACES[i % MOCK_INTERFACES.length];
  return {
    id: `L-${i}`,
    level,
    txId,
    ifName: iface.name,
    msg: `${iface.name} 처리 ${level === 'ERROR' ? '실패: Connection Timeout' : '성공'}`,
    duration: Math.floor(Math.random() * 500),
    createdAt: new Date(Date.now() - i * 60000).toISOString(),
  };
});

export const MOCK_REPROCESS = [
  { id: 'RP-001', txId: 'TX-99812', ifName: '재보험사 데이터 전송', protocol: 'SFTP', reason: 'Auth Failed', retries: 2, status: 'pending', failedAt: '2024-04-20 14:20:11' },
  { id: 'RP-002', txId: 'TX-99815', ifName: '손해사정 연계', protocol: 'SOAP', reason: 'Socket Timeout', retries: 1, status: 'pending', failedAt: '2024-04-20 15:45:00' },
];
