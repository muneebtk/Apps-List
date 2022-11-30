from django.contrib import admin
from . models import Category, Apps, SubCategory, Account, EarnedApps

class AccountAdmin(admin.ModelAdmin):
    readonly_fields = ('password',)
# class CategoryAdmin(admin.ModelAdmin):

admin.site.register(Category)
admin.site.register(Apps)
admin.site.register(SubCategory)
admin.site.register(Account,AccountAdmin)
admin.site.register(EarnedApps)

