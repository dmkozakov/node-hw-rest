import service from '../../services/EmailService';
import resendVerify from './resendVerify';

export default { verify: service.verify, resendVerify };
