from django.core.mail import EmailMessage
from django.utils.translation import ugettext_lazy as _
from royal_cloud_33498.settings import DEBUG, TWILIO_ACCOUNT_SID, TWILIO_ACCOUNT_TOKEN, TWILIO_MESSAGING_SID
from rest_framework.serializers import ValidationError
from rest_framework.authtoken.models import Token
import pyotp
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
from allauth.account.models import EmailAddress


def send_otp_sms(phone, otp):
    if DEBUG:
        try:
            client = Client(TWILIO_ACCOUNT_SID, TWILIO_ACCOUNT_TOKEN) 
            message = client.messages.create(  
                                        messaging_service_sid=TWILIO_MESSAGING_SID, 
                                        body='Your OTP is {}'.format(otp),      
                                        to='+1{}'.format(phone) 
                                    )
        except TwilioRestException as e:
            raise ValidationError('Please enter a valid North American phone number excluding country code {}').format(e)
    else:
        email = EmailMessage('OTP Verification', 'Your OTP is {}'.format(otp), from_email='sallar.rezaie@crowdbotics.com', to=('testemail@gmail.com',))
        email.send()


def generateOTP(phone=None, user=None):
    if phone and user:
        secret = pyotp.random_base32()
        totp = pyotp.TOTP(secret)
        otp = totp.now()
        user.activation_key = secret
        user.otp = otp
        user.save()
        sliced_otp = str(otp)[:4]
        send_otp_sms(phone=phone, otp=sliced_otp)
        return user


def verifyOTP(otp=None, activation_key=None, user=None):
    if otp and activation_key and user:
        totp = pyotp.TOTP(activation_key)
        sliced_otp = user.otp[:4]
        if otp == sliced_otp:
            return totp.verify(user.otp, valid_window=6)
        return False
    else:
        return False

def auth_token(user):
    token, created = Token.objects.get_or_create(user=user)
    return token


def set_email(email, user):
    EmailAddress.objects.get_or_create(user=user, 
                                     verified=True, 
                                     primary=True, 
                                     email=email)