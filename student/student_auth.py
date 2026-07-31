from django.shortcuts import redirect


def student_login_required(view_func):

    def wrapper(request, *args, **kwargs):

        if not request.session.get("student_login"):

            return redirect("student_login")

        return view_func(request, *args, **kwargs)

    return wrapper