# coronavirus-api
 > Coronavirus API (2019-nCoV)

El siguiente repositorio es un proyecto desarrollado en Node.js para obtener la informacion del coronavirus.<br>
Implementacion Web: https://coronavirus-f551f.firebaseapp.com/ <br>
Repositorio implementacion web: https://github.com/jairoD/coronavirus

# Rutas
 - GET <br/>
   - Obtener informacion general de cada pais:<br>
    ```https://ncov2019-api.herokuapp.com/api/countries/overall``` <br>
    ejm-respuesta:<br> {<br>  "countryRegion": "China",<br> "confirmed": 20492,<br> "recovered": 718,<br> "deaths": 425<br>},
   - Obtener informacion general de cada pais con sus provincias/estados<br>
    ```https://ncov2019-api.herokuapp.com/api/countries/specific```
    ejm-respuesta:<br> {<br>"provinceState": "Hubei",<br>  "countryRegion": "China",<br> "confirmed": 20492,<br> "recovered": 718,<br> "deaths": 425<br>},
    
Datos obtenidos de: https://docs.google.com/spreadsheets/d/1wQVypefm946ch4XDp37uZ-wartW4V7ILdg-qYiDXUHM/htmlview?usp=sharing&sle=true
