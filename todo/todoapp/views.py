from django.shortcuts import render
from django.http import HttpResponse,Http404
from .models import Activity,ActivitySerializer
from django.contrib.auth.models import auth,User
import datetime
#from django.views.decorators.csrf import ensure_csrf_cookie
#from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def index(request):
    return render(request, 'app/index.html')

#def logout(request):
#    return render(request, 'app/index.html')

def add_activity(request):
    activity_text = request.GET['activity']
    user_name = request.GET['user_name']
    target_date = request.GET['target_date']
    activity = Activity(activity= activity_text,username=user_name,create_date=datetime.datetime.now(),target_date=target_date,completed='NO') 
    try:
        activity.save()
        activities = get_all_activities(user_name)
        import json
        return HttpResponse(json.dumps(activities))
    except:
        return HttpResponse('False')

def get_all_activities(user_name):
    activities = Activity.objects.all().filter(username=user_name)
    activity_list = list()
    for activity in activities:
        s = ActivitySerializer(activity)
        activity_list.append(s.data)
    return activity_list[::-1]

def get_activity(request):
    username = request.GET['user_name']
    activities = get_all_activities(username)
    import json
    return HttpResponse(json.dumps(activities))

def complete_activity(request):
    username = request.GET['user_name']
    id = request.GET['id']
    activity = Activity.objects.get(id=id)
    activity.completed = 'YES'
    activity.save()
    activities = get_all_activities(username)
    import json
    return HttpResponse(json.dumps(activities))


def delete_activity(request):
    username = request.GET['user_name']
    id = request.GET['id']
    activity = Activity.objects.get(id=id)
    activity.delete()
    activities = get_all_activities(username)
    import json
    return HttpResponse(json.dumps(activities))


def is_user_exist(request):
    if request.method == 'POST':
        import json;
        data = json.loads(request.body.decode('utf-8'))
        name = data['name']
        pw = data['pw']
        user = auth.authenticate(username=name,password=pw)
        if user is None:
            return HttpResponse('False')
        else:
            return HttpResponse('True')  

#@ensure_csrf_cookie
def register(request):
    if request.method == 'POST':
        import json;
        data = json.loads(request.body.decode('utf-8'))
        name = data['name']
        pw = data['pw']
        email = data['email']

        #user_check = User.objects.get(username=name)
        #email = User.objects.get(Emailaddress=email)
        try:
            user = User.objects.get(username=name)
            return HttpResponse('False')
        except User.DoesNotExist:
            user = User.objects.create_user(name,email,pw)
            user.save()
            return HttpResponse('True')
