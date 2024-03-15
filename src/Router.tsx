import { Suspense } from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import AuthorizedRoute from '@/components/AuthorizedRoute';
import NotFoundErrorAlertFullScreen from '@/components/ErrorAlertFullScreen/NotFoundErrorAlertFullScreen';
import {
  BOARD_GAMES_PAGE_URL,
  CHATS_PAGE_URL,
  GATHERINGS_CREATE_PAGE_URL,
  GATHERINGS_FIX_PAGE_URL,
  GATHERINGS_PAGE_URL,
  LOGIN_PAGE_URL,
  NOTIFICATIONS_PAGE_URL,
  USERS_EDIT_PAGE_URL,
  USERS_PAGE_URL,
} from '@/constants/pageRoutes';
import BoardGameDetailPage from '@/pages/BoardGameDetail';
import GatheringCreatePage from '@/pages/GatheringCreate';
import { HomePage } from '@/pages/HomePage';
import LoginPage from '@/pages/Login';
import NotificationListPage from '@/pages/NotificationList';
import ProfilePage from '@/pages/Profile';
import RedirectOnAuthentication from '@/pages/RedirectOnAuthentication';

import SpinnerFullScreen from './components/Spinner/SpinnerFullScreen';
import GatheringFixPage from './pages/GatheringFix';
import GatheringListPage from './pages/GatheringList';
import ProfileEdit from './pages/ProfileEdit';

/**
 * 페이지 트랜지션을 제공하기 위해 `createBrowserRouter` 대신 `Routes` 요소를 사용해요.
 *
 * FIXME: CSSTransition과 Route를 분리하고자 했는데, 분리하면 애니메이션이 동작하지 않아서
 * 일단은 인라인하고 추후 리팩토링해볼게요..
 */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup className='transition-group'>
      <CSSTransition
        key={location.pathname}
        classNames='fade-page-transition'
        timeout={300}
      >
        <Routes location={location}>
          <Route
            path=''
            element={
              <Suspense fallback={<SpinnerFullScreen />}>
                <GatheringListPage />
              </Suspense>
            }
          />
          <Route
            path={LOGIN_PAGE_URL}
            element={
              <Suspense fallback={<SpinnerFullScreen />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path={CHATS_PAGE_URL}
            element={
              <Suspense fallback={<SpinnerFullScreen />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path={BOARD_GAMES_PAGE_URL}
            element={
              <Suspense fallback={<SpinnerFullScreen />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path={`${BOARD_GAMES_PAGE_URL}/:boardGameId`}
            element={
              <Suspense fallback={<SpinnerFullScreen />}>
                <BoardGameDetailPage />
              </Suspense>
            }
          />
          <Route
            path={NOTIFICATIONS_PAGE_URL}
            element={
              <Suspense fallback={<SpinnerFullScreen />}>
                <AuthorizedRoute>
                  <NotificationListPage />
                </AuthorizedRoute>
              </Suspense>
            }
          />
          <Route
            path={`${USERS_PAGE_URL}/:userId`}
            element={
              <Suspense fallback={<SpinnerFullScreen />}>
                <AuthorizedRoute>
                  <ProfilePage />
                </AuthorizedRoute>
              </Suspense>
            }
          />
          <Route
            path={GATHERINGS_CREATE_PAGE_URL}
            element={
              <Suspense fallback={<SpinnerFullScreen />}>
                <AuthorizedRoute>
                  <GatheringCreatePage />
                </AuthorizedRoute>
              </Suspense>
            }
          />
          <Route
            path={`${GATHERINGS_FIX_PAGE_URL}/:gatheringId`}
            element={
              <Suspense fallback={<SpinnerFullScreen />}>
                <GatheringFixPage />
              </Suspense>
            }
          />
          <Route
            path={`${GATHERINGS_PAGE_URL}/:gatheringId`}
            element={
              <Suspense fallback={<SpinnerFullScreen />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path={`${USERS_EDIT_PAGE_URL}/:userId`}
            element={
              <Suspense fallback={<SpinnerFullScreen />}>
                <ProfileEdit />
              </Suspense>
            }
          />
          <Route path='/redirect' element={<RedirectOnAuthentication />} />
          <Route path='*' element={<NotFoundErrorAlertFullScreen />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AnimatedRoutes;
