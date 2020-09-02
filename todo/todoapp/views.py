from django.shortcuts import render
from django.http import HttpResponse,Http404
from .models import Activity,ActivitySerializer
from django.contrib.auth.models import auth,User

# Create your views here.

def index(request):
    return render(request, 'app/index.html')

def logout(request):
    return render(request, 'app/index.html')

def add_activity(request):
    activity_text = request.GET['activity']
    activity = Activity(activity= activity_text) 
    try:
        activity.save();
        activities = get_all_activities()
        import json
        return HttpResponse(json.dumps(activities))
    except:
        return HttpResponse('False')

def get_all_activities():
    activities = Activity.objects.all();
    activity_list = list()
    for activity in activities:
        s = ActivitySerializer(activity)
        activity_list.append(s.data)
    return activity_list

def get_activity(request):
    activities = get_all_activities()
    import json
    return HttpResponse(json.dumps(activities))

def delete_activity(request):
    id = request.GET['id'];
    activity = Activity.objects.get(id=id)
    activity.delete()
    activities = get_all_activities()
    import json
    return HttpResponse(json.dumps(activities))

def is_user_exist(request):
    name = request.GET['name']
    pw = request.GET['pw']
    user = auth.authenticate(username=name,password=pw)
    if user is None:
        return HttpResponse('False')
        
    else:
        return HttpResponse('True')
        

