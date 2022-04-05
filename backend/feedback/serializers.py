from rest_framework import serializers
from .models import Feedback


class FeedbackSerializer(serializers.ModelSerializer):
    """
    A data representation of a User's Feedback to the Admin
    """
    class Meta:
        model = Feedback
        fields = '__all__'


#Add User Field