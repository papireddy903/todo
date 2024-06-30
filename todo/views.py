from django.shortcuts import render
from rest_framework.views import APIView 
from .models import *
from .serializer import TaskSerializer
from rest_framework import status
from rest_framework.response import Response 
# Create your views here.

class TaskView(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        serializer =  TaskSerializer(tasks, many=True) 
        return Response(serializer.data) 
    
    def post(self, request):
        serializer = TaskSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskDetail(APIView):
    def get(self, request, pk):
        task = Task.objects.get(pk=pk) 

        if task is not None:
            serializer = TaskSerializer(task, many=False)
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    
    def delete(self,request, pk):
        task = Task.objects.get(pk=pk)
        if task is not None:
            task.delete()
            return Response(status=status.HTTP_204_NO_CONTENT) 

        return Response(status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, pk):
        task = Task.objects.get(pk=pk)
        serializer = TaskSerializer(task, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
