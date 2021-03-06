from django.urls import path, include
from rest_framework.routers import DefaultRouter
from customadmin.views import AdminProductOrdersViewSet
from feedback.views import FeedbackViewSet

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet,
)
from notifications.views import BroadcastViewSet, NotificationViewSet
from orders.views import CartViewSet, OrderViewSet
from products.views import BrandViewSet, CategoryViewSet, ProductViewSet
from users.viewsets import UserViewSet

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("users", UserViewSet, basename="users")
router.register("orders", OrderViewSet, basename="orders")
router.register("cart", CartViewSet, basename="cart")
router.register("products", ProductViewSet, basename="products")
router.register("brands", BrandViewSet, basename="brands")
router.register("categories", CategoryViewSet, basename="categories")
router.register("feedback", FeedbackViewSet, basename="feedback")
router.register("notifications", NotificationViewSet, basename="notifications")
router.register("broadcasts", BroadcastViewSet, basename="broadcasts")
router.register("admin/orders", AdminProductOrdersViewSet, basename="admin_orders")

urlpatterns = [
    path("", include(router.urls)),
]
