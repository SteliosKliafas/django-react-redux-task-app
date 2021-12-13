from django.db import models
# Create your models here.


class Task(models.Model):
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(auto_now_add=False, blank=True, null=True)
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.name

