from django.urls import path 
from . import views 

urlpatterns = [
    path("tasks/", views.TaskView().as_view(), name="task"),
    path("tasks/<int:pk>/", views.TaskDetail.as_view(),name="task-detail"),
    
]