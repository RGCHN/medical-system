export const stateMap = {
  "1": "超急性期(0-6小时)",
  "2": "急性期(6-24小时)",
  "3": "亚急性期(24小时-2周)",
  "4": "慢性期(大于2周)",
}
export const userTypeMap = {
  "1": "管理员",
  "2": "主任医生",
  "3": "医生",
}

export const clearToken = () => {
  localStorage.removeItem('access_token');
}
