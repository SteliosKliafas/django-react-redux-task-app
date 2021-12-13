from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer


# Create your views here.
@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.filter().order_by('-id')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def taskDetails(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def taskCreate(request):
    data = request.data
    # try:
    task = Task.objects.create(
            name=data['name'],
        )
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)
    # except:
    #     message = {'detail': 'error!'}
    #     return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def taskUpdate(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)
    if serializer.is_valid():
        serializer.save()
    print(task.status)
    return Response(serializer.data)


@api_view(['DELETE'])
def taskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response('Task Successfully Deleted')
