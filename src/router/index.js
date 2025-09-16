import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/user';
import MainLayout from '@/layouts/MainLayout.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    // 如果用户已登录，访问登录页时自动跳转到首页
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.isAuthenticated) {
        next({ name: 'Dashboard' });
      } else {
        next();
      }
    },
  },
  {
    path: '/',
    component: MainLayout, // 使用主布局
    redirect: '/dashboard',
    meta: { requiresAuth: true }, // 这个布局下的所有页面都需要认证
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      // 设备管理
      {
        path: 'equipment',
        name: 'EquipmentList',
        component: () => import('@/views/equipment/EquipmentList.vue'),
      },
      {
        path: 'equipment/:id',
        name: 'EquipmentDetail',
        component: () => import('@/views/equipment/EquipmentDetail.vue'),
        props: true, // 将路由参数 :id 作为 props 传入组件
      },
      // 采购管理
      {
        path: 'procurement',
        name: 'ProcurementList',
        component: () => import('@/views/procurement/ProcurementList.vue'),
      },
       // 系统管理
      {
        path: 'system/users',
        name: 'UserManagement',
        component: () => import('@/views/system/UserManagement.vue'),
        meta: { roles: ['System Administrator'] } // 示例：仅限系统管理员访问
      },
    ],
  },
  // 404 页面 (可选)
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('@/views/NotFound.vue'),
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * 全局前置守卫 (Navigation Guard)
 *
 * 每次路由跳转前执行，用于检查用户认证和权限。
 */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  // 检查 `to` 路由是否需要认证
  if (to.meta.requiresAuth) {
    // 检查用户是否已登录 (通过 token 或 store 中的状态)
    if (userStore.isAuthenticated) {
        // 如果 store 中没有用户信息，则尝试获取
        if (!userStore.userInfo) {
            try {
                await userStore.fetchUserInfo();
            } catch (error) {
                // 获取用户信息失败，可能是 token 失效，重定向到登录页
                userStore.logout();
                return next({ name: 'Login' });
            }
        }

        // 检查角色权限 (可选)
        const requiredRoles = to.meta.roles;
        if (requiredRoles && !requiredRoles.some(role => userStore.roles.includes(role))) {
            // 如果用户角色不满足，可以重定向到无权限页面或首页
            // 此处简单地阻止导航
             alert('您没有权限访问此页面');
             return next(from); // 或者 next({ name: 'Dashboard' });
        }
        
        // 认证和授权都通过，允许导航
        next();
    } else {
      // 用户未登录，重定向到登录页面
      // 将用户想要访问的页面路径作为查询参数传递，以便登录后可以重定向回来
      next({
        name: 'Login',
        query: { redirect: to.fullPath },
      });
    }
  } else {
    // 如果路由不需要认证，直接放行
    next();
  }
});


export default router;
