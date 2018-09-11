import humps from 'lodash-humps';

function convertServerFollow(followInfo) {
  if (followInfo.length === 0) { return []; }
  return followInfo.map(humps);
}

function convertClientFollow(followInfo) {
  if (followInfo.length === 0) { return []; }
  return followInfo.map(humps);
}

function convertServerUsersEducation(educationInfo) {
  if (educationInfo.length === 0) { return []; }
  return educationInfo.map(education => ({
    id: education.id,
    userId: education.user_id,
    title: education.title,
    speciality: education.speciality,
    createdAt: education.created_at,
    updatedAt: education.updated_at,
    startDate: education.start_date,
    endDate: education.end_date,
    degree: education.degree,
    isCurrent: education.is_current,
  }));
}

export function convertClientUsersEducation(educationInfo) {
  if (educationInfo.length === 0) { return []; }
  return educationInfo.map(education => ({
    id: education.id,
    user_id: education.userId,
    title: education.title,
    speciality: education.speciality,
    created_at: education.createdAt,
    updated_at: education.updatedAt,
    start_date: education.startDate,
    end_date: education.endDate,
    degree: education.degree,
    is_current: education.isCurrent,
  }));
}

export function convertServerUsersJobs(jobsInfo) {
  if (jobsInfo.length === 0) { return []; }
  return jobsInfo.map(job => ({
    id: job.id,
    userId: job.user_id,
    title: job.title,
    startDate: job.start_date,
    endDate: job.end_date,
    createdAt: job.created_at,
    updatedAt: job.updated_at,
    position: job.position,
    isCurrent: job.is_current,
  }));
}

export function convertClientUsersJobs(jobsInfo) {
  if (jobsInfo.length === 0) { return []; }
  return jobsInfo.map(job => ({
    id: job.id,
    user_id: job.userId,
    title: job.title,
    start_date: job.startDate,
    end_date: job.endDate,
    created_at: job.createdAt,
    updated_at: job.updatedAt,
    position: job.position,
    is_current: job.isCurrent,
  }));
}

function convertServerUsersSources(sourcesInfo) {
  if (sourcesInfo.length === 0) { return []; }
  return sourcesInfo.map(source => ({
    id: source.id,
    userId: source.user_id,
    sourceTypeId: source.source_type_id,
    createdAt: source.created_at,
    updatedAt: source.updated_at,
    sourceUrl: source.source_url,
    isOfficial: source.is_official,
  }));
}

function convertClientUsersSources(sourcesInfo) {
  if (sourcesInfo.length === 0) { return []; }
  return sourcesInfo.map(source => ({
    id: source.id,
    user_id: source.userId,
    source_type_id: source.sourceTypeId,
    created_at: source.createdAt,
    updated_at: source.updatedAt,
    source_url: source.sourceUrl,
    is_official: source.isOfficial,
  }));
}

export function convertServerUser(response) {
  return {
    id: response.id,
    accountName: response.account_name,
    nickName: response.nickname,
    firstName: response.first_name,
    lastName: response.last_name,
    email: response.email,
    phoneNumber: response.phone_number,
    birthday: response.birthday,
    about: response.about,
    country: response.country,
    city: response.city,
    address: response.address,
    moodMessage: response.mood_message,
    avatarFilename: response.avatar_filename,
    privateKey: response.private_key,
    publicKey: response.public_key,
    ownerPublicKey: response.owner_public_key,
    currencyToShow: response.currency_to_show,
    firstCurrency: response.first_currency,
    firstCurrencyYear: response.first_currency_year,
    personalWebsitesUrls: response.personal_website_url,
    achievementsFileName: response.achievements_filename,
    currentRate: response.current_rate,
    blockchainRegistrationStatus: response.blockchain_registration_status,
    createdAt: response.created_at,
    updatedAt: response.updated_at,
    userEducations: response.users_education ? convertServerUsersEducation(response.users_education) : [],
    userJobs: response.users_jobs ? convertServerUsersJobs(response.users_jobs) : [],
    usersSources: response.users_sources ? convertServerUsersSources(response.users_sources) : [],
    iFollow: response.I_follow ? convertServerFollow(response.I_follow) : [],
    followedBy: response.followed_by ? convertServerFollow(response.followed_by) : [],
  };
}

export function convertClientUser(userData) {
  return {
    id: userData.id,
    account_name: userData.accountName,
    nickname: userData.nickName,
    first_name: userData.firstName,
    last_name: userData.lastName,
    email: userData.email,
    phone_number: userData.phoneNumber,
    birthday: userData.birthday,
    about: userData.about,
    country: userData.country,
    city: userData.city,
    address: userData.address,
    mood_message: userData.moodMessage,
    avatar_filename: userData.avatarFilename,
    private_key: userData.privateKey,
    public_key: userData.publicKey,
    owner_public_key: userData.ownerPublicKey,
    currency_to_show: userData.currencyToShow,
    first_currency: userData.firstCurrency,
    first_currency_year: userData.firstCurrencyYear,
    personal_website_url: userData.personalWebsitesUrls,
    achievements_filename: userData.achievementsFileName,
    current_rate: userData.currentRate,
    blockchain_registration_status: userData.blockchainRegistrationStatus,
    created_at: userData.createdAt,
    updated_at: userData.updatedAt,
    users_education: convertClientUsersEducation(userData.userEducations),
    users_jobs: convertClientUsersJobs(userData.userJobs),
    users_sources: convertClientUsersSources(userData.usersSources),
    I_follow: convertClientFollow(userData.iFollow),
    followed_by: convertClientFollow(userData.followedBy),
  };
}

export function convertServerUserLogin(loginData) {
  return {
    success: loginData.success,
    token: loginData.token,
    user: convertServerUser(loginData.user),
  };
}
