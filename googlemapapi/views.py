from django.shortcuts import render

from .models import Address
import googlemaps


def home(request):
    return render(request, 'index.html')


def googlemapapi(request):

    startaddr = request.POST.get('startAdd', ' ')
    print("startadd: ", startaddr)
    endaddr = request.POST.get('endAdd', ' ')

    if request.method == "GET":
        print("Get method is here")

        # Validate if Address object already created and assign values to it.
        if Address.objects.all().filter(user=request.user).exists():
            print("Address object exist")
            addr = Address.objects.get(user=request.user)



        else:
            addr = Address.objects.create(startloc=startaddr,
                                          endloc=endaddr, user=request.user)

        addr.save()


    if request.method == "POST":
        print("Post method is here")

        # Validate if Address object already created and assign values to it.
        if Address.objects.all().filter(user=request.user).exists():
            print("Address object exist")
            addr = Address.objects.get(user=request.user)
            addr.startloc = startaddr
            addr.endloc = endaddr


        else:
            addr = Address.objects.create(startloc=startaddr,
                                          endloc=endaddr,  user=request.user)


        addr.save()
        print("addr: ", addr)
        print("addr.startloc", addr.startloc)
        print("addr.endloc", addr.endloc)


        try:
            #GOOGLE_API_MATRIX assigned inside the environemntal variable
            # gmaps = googlemaps.Client(key=os.environ.get('GOOGLE_API_MATRIX'))
            GOOGLE_API_MATRIX = 'GOOGLE_API_KEY_HERE'
            gmaps = googlemaps.Client(GOOGLE_API_MATRIX)
            # the reason we have [0] is empty dictinary (It seems to be per design)
            actualdistance = gmaps.distance_matrix(addr.startloc, addr.endloc)
            addr.actualdistance = round((actualdistance['rows'][0]['elements'][0]['distance']['value']) / 1000, 2)
            print ("addr.actualDistance", addr.actualdistance)
            addr.save()
        except:
            pass


    return render(request, 'googlemapapi.html', {
                                                'startpoint':addr.startloc,
                                                'endpoint':addr.endloc,
                                                'actualdistance': addr.actualdistance,
                                          })

