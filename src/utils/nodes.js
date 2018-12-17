export const BP_STATUS_ACTIVE_ID = 1;
export const BP_STATUS_BACKUP_ID = 2;
export const LIMITER_OF_PRODUCERS = 30;

export const getBpStatusById = (id) => {
  switch (id) {
    case BP_STATUS_ACTIVE_ID:
      return 'Active';

    case BP_STATUS_BACKUP_ID:
    default:
      return 'Backup';
  }
};
