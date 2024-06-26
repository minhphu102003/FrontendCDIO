
import {
    Home,
    ProfileEdit,
    EditSpace,
    MySharing,
    Notifications,
    Feedback,
    BooingHistory,
    Spaces,
    LogIn,
    OtpResetPass,
    VerifyEmail,
    Register,
    SpaceDetail,
    PostSpaceHome,
    FavoriteSpace,
    ManagePostHome,
    Editprofile,
    MessengeHome,
    Contact,
    Booking,
    Sharing,
    SpaceDetailSharing,
    Blog,
    ListMedicine
} from '../pages/index';

import Dashboard from '../components/admin/Dashboard';
import Owner from '../components/admin/Owner';
import User from '../components/admin/User';
import PostSpace from "../components/admin/PostSpace";
import  {LayoutAdmin,LayoutAuth,LayoutUser} from "../layouts/index";
import Notification from "../components/admin/Notification";
const router = [
    { path: '/', component: Home },
    { path: '/blog', component: Blog},
    { path: '/spaces', component: Spaces },
    { path: '/contact', component: Contact  },
    { path: '/login',layout: LayoutAuth ,component: LogIn },
    { path: '/forgot-password',layout: LayoutAuth ,component: OtpResetPass },
    { path: '/verify-email',layout: LayoutAuth ,component: VerifyEmail },
    { path: '/register',layout: LayoutAuth ,component: Register },
    { path: '/spaces/:spaceId', component: SpaceDetail },
    { path: '/booking', component: Booking },
    { path: '/sharing', component: Sharing },
    { path: '/listmedicine' , component: ListMedicine},
    { path: '/profile',layout: LayoutUser,component: Editprofile },
    { path: '/post-spaces', layout: LayoutUser,component: PostSpaceHome },
    { path: '/messenger', layout: LayoutUser,component: MessengeHome },
    { path: '/my-sharing', layout: LayoutUser,component: MySharing },
    { path: '/manage-post', layout: LayoutUser,component: ManagePostHome },
    { path: '/favorite-space', layout: LayoutUser,component: FavoriteSpace },
    { path: '/booking-history', layout: LayoutUser,component: BooingHistory },
    { path: '/booking-history', layout: LayoutUser,component: BooingHistory },
    { path: '/notifications', layout: LayoutUser,component: Notifications },
    { path: '/feedback', layout: LayoutUser,component: Feedback },
    { path: '/spaces/:spaceId', component: SpaceDetail },
    { path: '/shares/:spaceId', component: SpaceDetailSharing },
    { path: '/admin/dashboard', layout: LayoutAdmin, component: Dashboard},
    { path: '/admin/user', layout: LayoutAdmin, component: User},
    { path: '/admin/owner', layout: LayoutAdmin, component: Owner},
    { path: '/editspace',layout: LayoutAuth ,component: EditSpace },
    { path: '/profileedit',layout: LayoutAuth ,component: ProfileEdit },
    { path: "/admin/notification", layout: LayoutAdmin, component: Notification },
    {
        path: "/admin/posts-space/:statusId",
        layout: LayoutAdmin,
        component: PostSpace,
    },
    // { path: '/admin/posts-pace', layout: LayoutAdmin, component: PostSpace}
];


export {router}
