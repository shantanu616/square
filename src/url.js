const baseurl="http://localhost/OTHER/Jobportal_Api/public/api"
// const baseurl="http://localhost:8000/api"
export const TAG="WEB";
export const USERID=localStorage.getItem('user_id')==null?0:localStorage.getItem('user_id');
export const LOGIN=baseurl+"/login";
export const REGISTER=baseurl+"/register";
export const LOGOUT=baseurl+"/logout";
export const CREATERECRUITER=baseurl+"/createRecruiter";
export const GETJOBCATEGORY=baseurl+"/getJobcategory";
export const AUTHENTICATERECRUITER=baseurl+"/authenticate_recruiter";
export const GETRECRUITERJOBS=baseurl+"/getRecruiterJobs";
export const GETALLJOBSBEFORE=baseurl+"/getAllJobsBeforeLogin";
export const GETALLJOBSAFTER=baseurl+"/getAllJobsAfterLogin";
export const CREATEJOB=baseurl+"/createJob";
export const APPLYJOB=baseurl+"/applyJob";
export const GETRECRUITERAPPLICATIONSTATUS=baseurl+"/jobById";