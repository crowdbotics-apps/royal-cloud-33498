from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet,
)
from products.views import BrandViewSet, ProductViewSet
from users.viewsets import UserViewSet

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("users", UserViewSet, basename="users")
router.register("products", ProductViewSet, basename="products")
router.register("brands", BrandViewSet, basename="brands")

urlpatterns = [
    path("", include(router.urls)),
]
