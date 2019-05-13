import { OPEN_USER_DRAWER, CLOSE_USER_DRAWER } from '../constants';

export const openUserDrawer = () => ({
  type: OPEN_USER_DRAWER,
});

export const closeUserDrawer = () => ({
  type: CLOSE_USER_DRAWER,
});
