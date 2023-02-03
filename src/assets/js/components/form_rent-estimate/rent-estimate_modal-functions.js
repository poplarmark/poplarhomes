var map;
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13
  });
  // Autocomplete restrictions
  var options = {
    componentRestrictions: { country: "us" },
  };

  var input = document.getElementById('pac_input');
  var autocomplete = new google.maps.places.Autocomplete(input, options);

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    var inputValue = place.name + " " + place.formatted_address;
    console.log(inputValue);

    // Mirror autocomplete value to inputs with name=location
    $(document).ready(function () {
      $('input[name="location"]').val(inputValue.val());
    });
 
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindowContent.children['place-icon'].src = place.icon;
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-address'].textContent = address;
    infowindow.open(map, marker);
  });
}

// Modal functions
function showModal() {
  // Start postal codes for major services
  var code_portland = [
    "97003",
    "97005",
    "97006",
    "97007",
    "97008",
    "97015",
    "97024",
    "97027",
    "97030",
    "97034",
    "97035",
    "97036",
    "97060",
    "97062",
    "97068",
    "97070",
    "97075",
    "97076",
    "97077",
    "97078",
    "97079",
    "97080",
    "97086",
    "97089",
    "97124",
    "97140",
    "97201",
    "97202",
    "97203",
    "97204",
    "97205",
    "97206",
    "97207",
    "97208",
    "97209",
    "97210",
    "97211",
    "97212",
    "97213",
    "97214",
    "97215",
    "97216",
    "97217",
    "97218",
    "97219",
    "97220",
    "97221",
    "97222",
    "97223",
    "97224",
    "97225",
    "97227",
    "97228",
    "97229",
    "97230",
    "97232",
    "97233",
    "97236",
    "97238",
    "97239",
    "97240",
    "97242",
    "97250",
    "97251",
    "97252",
    "97253",
    "97254",
    "97256",
    "97258",
    "97266",
    "97267",
    "97268",
    "97269",
    "97280",
    "97281",
    "97282",
    "97283",
    "97286",
    "97290",
    "97291",
    "97292",
    "97293",
    "97294",
    "97296",
    "97298",
  ];
  var code_eugene = [
    "97401",
    "97402",
    "97403",
    "97404",
    "97405",
    "97408",
    "97409",
    "97419",
    "97424",
    "97426",
    "97431",
    "97437",
    "97438",
    "97440",
    "97446",
    "97448",
    "97452",
    "97455",
    "97475",
    "97477",
    "97478",
    "97487",
  ];
  var code_nashville = [
    "37011",
    "37013",
    "37015",
    "37024",
    "37027",
    "37048",
    "37066",
    "37070",
    "37072",
    "37073",
    "37075",
    "37076",
    "37077",
    "37080",
    "37086",
    "37115",
    "37116",
    "37121",
    "37122",
    "37135",
    "37138",
    "37146",
    "37152",
    "37167",
    "37172",
    "37188",
    "37189",
    "37201",
    "37202",
    "37203",
    "37204",
    "37205",
    "37206",
    "37207",
    "37208",
    "37209",
    "37210",
    "37211",
    "37212",
    "37213",
    "37214",
    "37215",
    "37216",
    "37217",
    "37218",
    "37219",
    "37220",
    "37221",
    "37222",
    "37224",
    "37227",
    "37228",
    "37229",
    "37230",
    "37232",
    "37234",
    "37235",
    "37236",
    "37238",
    "37240",
    "37241",
    "37242",
    "37243",
    "37244",
    "37246",
    "37250",
    "37143",
  ];
  var code_antelope = "95843";
  var code_carmichael = ["95608", "95609"];
  var code_citrus_heights = ["95610", "95611", "95621"];
  var code_clarksburg = ["95612", "20871"];
  var code_davis = ["95616", "95617", "95618"];
  var code_el_dorado_hills = "95762";
  var code_elk_grove = ["95624", "95758", "95759"];
  var code_elverta = "95626";
  var code_fair_oaks = "95628";
  var code_folsom = ["95630", "95763"];
  var code_granite_bay = "95746";
  var code_hood = "95639";
  var code_mather = "95655";
  var code_mcclellan = "95652";
  var code_north_highlands = "95660";
  var code_orangevale = "95662";
  var code_rancho_cordova = ["95670", "95741", "95742"];
  var code_represa = "95671";
  var code_rescue = "95672";
  var code_rio_linda = "95673";
  var code_rocklin = ["95677", "95765"];
  var code_roseville = ["95661", "95678", "95747"];
  var code_sacramento = [
    "94203",
    "94204",
    "94205",
    "94206",
    "94207",
    "94208",
    "94209",
    "94211",
    "94229",
    "94230",
    "94232",
    "94234",
    "94235",
    "94236",
    "94237",
    "94239",
    "94240",
    "94244",
    "94245",
    "94247",
    "94248",
    "94249",
    "94250",
    "94252",
    "94254",
    "94256",
    "94257",
    "94258",
    "94259",
    "94261",
    "94262",
    "94263",
    "94267",
    "94268",
    "94269",
    "94271",
    "94273",
    "94274",
    "94277",
    "94278",
    "94279",
    "94280",
    "94282",
    "94283",
    "94284",
    "94285",
    "94287",
    "94288",
    "94289",
    "94290",
    "94291",
    "94293",
    "94294",
    "94295",
    "94296",
    "94297",
    "94298",
    "94299",
    "95811",
    "95812",
    "95813",
    "95814",
    "95815",
    "95816",
    "95817",
    "95818",
    "95819",
    "95820",
    "95821",
    "95822",
    "95823",
    "95824",
    "95825",
    "95826",
    "95827",
    "95828",
    "95829",
    "95830",
    "95831",
    "95832",
    "95833",
    "95834",
    "95835",
    "95836",
    "95837",
    "95838",
    "95840",
    "95841",
    "95842",
    "95851",
    "95852",
    "95853",
    "95860",
    "95864",
    "95865",
    "95866",
    "95867",
    "95894",
    "95899",
  ];
  var code_west_sacramento = ["95605", "95691", "95798", "95799"];
  var code_woodland = "95776";
  var code_yolo = "95697";
  var code_bellevue = [
    "98004",
    "98005",
    "98006",
    "98007",
    "98008",
    "98009",
    "98015",
  ];
  var code_bothel = ["98011", "98012", "98021", "98041"];
  var code_edmonds = ["98020", "98026"];
  var code_everett = ["98204", "98208"];
  var code_issaquah = "98029";
  var code_kenmore = "98028";
  var code_kent = ["98030", "98031", "98032", "98035", "98064", "98089"];
  var code_kirkland = ["98033", "98034", "98083"];
  var code_lynnwood = ["98036", "98037", "98046", "98087"];
  var code_medina = "98039";
  var code_mercer_island = "98040";
  var code_mill_creek = "98082";
  var code_mountlake_terrace = "98043";
  var code_mukilteo = "98275";
  var code_redmond = ["98052", "98053", "98073"];
  var code_renton = ["98055", "98056", "98057", "98058", "98059"];
  var code_sammamish = ["98074", "98075"];
  var code_seahurst = "98062";
  var code_seattle = [
    "98101",
    "98102",
    "98103",
    "98104",
    "98105",
    "98106",
    "98107",
    "98108",
    "98109",
    "98111",
    "98112",
    "98113",
    "98114",
    "98115",
    "98116",
    "98117",
    "98118",
    "98119",
    "98121",
    "98122",
    "98124",
    "98125",
    "98126",
    "98127",
    "98129",
    "98131",
    "98133",
    "98134",
    "98136",
    "98138",
    "98139",
    "98141",
    "98144",
    "98145",
    "98146",
    "98148",
    "98154",
    "98155",
    "98158",
    "98160",
    "98161",
    "98164",
    "98165",
    "98166",
    "98168",
    "98170",
    "98174",
    "98175",
    "98177",
    "98178",
    "98181",
    "98185",
    "98188",
    "98190",
    "98191",
    "98194",
    "98195",
    "98198",
    "98199",
  ];
  var code_alhambra = ["91801", "91802", "91803", "91804", "91896", "91899"];
  var code_altadena = ["91001", "91003"];
  var code_arcadia = ["91006", "91007", "91066", "91077"];
  var code_bell = "90201";
  var code_bell_gardens = "90202";
  var code_bellflower = ["90706", "90707"];
  var code_beverly_hills = ["90209", "90210", "90211", "90212", "90213"];
  var code_burbank = [
    "91501",
    "91502",
    "91503",
    "91504",
    "91505",
    "91506",
    "91507",
    "91508",
    "91510",
    "91521",
    "91522",
    "91523",
    "91526",
  ];
  var code_canoga_park = ["91303", "91305", "91309"];
  var code_carson = ["90745", "90746", "90747", "90749", "90895"];
  var code_chatsworth = "91313";
  var code_city_of_industry = ["91714", "91715", "91716"];
  var code_compton = ["90220", "90221", "90222", "90223", "90224"];
  var code_culver_city = ["90230", "90231", "90232", "90233"];
  var code_dodgertown = "90090";
  var code_downey = ["90239", "90240", "90241", "90242"];
  var code_duarte = "91009";
  var code_el_monte = ["91731", "91732", "91734", "91735"];
  var code_el_segundo = "90245";
  var code_gardena = [
    "90247",
    "90248",
    "90249",
    "91201",
    "91202",
    "91203",
    "91204",
    "91205",
    "91206",
    "91207",
    "91208",
    "91209",
    "91210",
    "91221",
    "91222",
    "91225",
    "91226",
  ];
  var code_glendale = [
    "91201",
    "91202",
    "91203",
    "91204",
    "91205",
    "91206",
    "91207",
    "91208",
    "91209",
    "91210",
    "91221",
    "91222",
    "91225",
    "91226",
  ];
  var code_granada_hills = ["91344", "91394"];
  var code_harbor_city = "90710";
  var code_hawthorne = ["90250", "90251"];
  var code_hermosa_beach = "90254";
  var code_huntington_park = "90255";
  var code_inglewood = [
    "90301",
    "90302",
    "90303",
    "90304",
    "90305",
    "90306",
    "90307",
    "90308",
    "90309",
    "90310",
    "90311",
    "90312",
  ];
  var code_la_cañada_flintridge = "91012";
  var code_la_crescenta = ["91214", "91224"];
  var code_lakewood = ["90711", "90712", "90713", "90714"];
  var code_lawndale = ["90260", "90261"];
  var code_lomita = "90717";
  var code_long_beach = [
    "90801",
    "90802",
    "90803",
    "90804",
    "90805",
    "90806",
    "90807",
    "90808",
    "90809",
    "90810",
    "90813",
    "90814",
    "90815",
    "90822",
    "90831",
    "90832",
    "90833",
    "90840",
    "90842",
    "90844",
    "90846",
    "90847",
    "90848",
    "90853",
    "90899",
  ];
  var code_los_angeles = [
    "90001",
    "90002",
    "90003",
    "90004",
    "90005",
    "90006",
    "90007",
    "90008",
    "90009",
    "90010",
    "90011",
    "90012",
    "90013",
    "90014",
    "90015",
    "90016",
    "90017",
    "90018",
    "90019",
    "90020",
    "90021",
    "90022",
    "90023",
    "90024",
    "90025",
    "90026",
    "90027",
    "90028",
    "90029",
    "90030",
    "90031",
    "90032",
    "90033",
    "90034",
    "90035",
    "90036",
    "90037",
    "90038",
    "90039",
    "90040",
    "90041",
    "90042",
    "90043",
    "90044",
    "90045",
    "90046",
    "90047",
    "90048",
    "90050",
    "90051",
    "90052",
    "90053",
    "90054",
    "90055",
    "90056",
    "90057",
    "90058",
    "90059",
    "90060",
    "90061",
    "90062",
    "90063",
    "90064",
    "90065",
    "90066",
    "90067",
    "90068",
    "90070",
    "90071",
    "90072",
    "90073",
    "90074",
    "90075",
    "90076",
    "90078",
    "90079",
    "90080",
    "90081",
    "90082",
    "90083",
    "90084",
    "90086",
    "90087",
    "90088",
    "90089",
    "90091",
    "90093",
    "90094",
    "90095",
    "90096",
    "90099",
    "90189",
  ];
  var code_lynwood = "90262";
  var code_manhattan_beach = ["90266", "90267"];
  var code_marina_del_rey = ["90292", "90295"];
  var code_maywood = "90270";
  var code_mission_hills = ["91345", "91346", "91395"];
  var code_monrovia = "91017";
  var code_montebello = "90640";
  var code_monterey_park = ["91754", "91755", "91756"];
  var code_montrose = ["91020", "91021"];
  var code_north_hills = ["91343", "91393"];
  var code_north_hollywood = [
    "91601",
    "91602",
    "91603",
    "91605",
    "91606",
    "91609",
    "91611",
    "91612",
    "91615",
    "91616",
    "91618",
  ];
  var code_northridge = ["91324", "91325", "91327", "91328", "91329", "91330"];
  var code_pacoima = ["91331", "91333"];
  var code_palos_verdes_peninsula = "90274";
  var code_panorama_city = ["91402", "91412"];
  var code_paramount = "90723";
  var code_pasadena = [
    "91101",
    "91102",
    "91103",
    "91104",
    "91105",
    "91106",
    "91107",
    "91109",
    "91110",
    "91114",
    "91115",
    "91116",
    "91117",
    "91121",
    "91123",
    "91124",
    "91125",
    "91126",
    "91129",
    "91182",
    "91184",
    "91185",
    "91188",
    "91189",
    "91199",
    "77501",
    "77502",
    "77503",
    "77504",
    "77505",
    "77506",
    "77507",
    "77508",
    "21122",
    "21123",
  ];
  var code_pico_rivera = ["90660", "90661", "90662"];
  var code_playa_del_rey = ["90293", "90296"];
  var code_porter_ranch = "91326";
  var code_rancho_palos_verdes = "90275";
  var code_redondo_beach = ["90277", "90278"];
  var code_reseda = ["91335", "91337"];
  var code_rosemead = ["91770", "91771", "91772"];
  var code_san_fernando = ["91340", "91341"];
  var code_san_gabriel = ["91775", "91776", "91778"];
  var code_san_marino = ["91108", "91118"];
  var code_san_pedro = ["90731", "90732", "90733", "90734"];
  var code_santa_monica = [
    "90401",
    "90402",
    "90403",
    "90404",
    "90405",
    "90406",
    "90407",
    "90408",
    "90409",
    "90410",
    "90411",
  ];
  var code_sierra_madre = "91025";
  var code_signal_hill = "90755";
  var code_south_el_monte = "91733";
  var code_south_gate = "90280";
  var code_south_pasadena = ["91030", "91031"];
  var code_studio_city = ["91604", "91614"];
  var code_sun_valley = ["91352", "91353"];
  var code_sylmar = "91392";
  var code_tarzana = "91357";
  var code_temple_city = "91780";
  var code_toluca_lake = "91610";
  var code_torrance = [
    "90501",
    "90502",
    "90503",
    "90504",
    "90505",
    "90506",
    "90507",
    "90508",
    "90509",
    "90510",
  ];
  var code_tujunga = "91043";
  var code_universal_city = "91608";
  var code_valencia = "91385";
  var code_valley_village = ["91607", "91617"];
  var code_van_nuys = [
    "91401",
    "91404",
    "91405",
    "91406",
    "91407",
    "91408",
    "91409",
    "91410",
    "91411",
    "91470",
    "91482",
    "91496",
    "91499",
  ];
  var code_venice = ["90291", "90294"];
  var code_verdugo_city = "91046";
  var code_west_hills = "91308";
  var code_west_hollywood = "90069";
  var code_wilmington = ["90744", "90748"];
  var code_winnetka = ["91306", "91396"];
  var code_woodland_hills = "91371";
  var code_alameda = ["94501", "94502"];
  var code_alamo = "94507";
  var code_albany = "94706";
  var code_alviso = "95002";
  var code_antioch = ["94509", "94531"];
  var code_atherton = "94027";
  var code_belmont = "94002";
  var code_belvedere_tiburon = "94920";
  var code_berkeley = [
    "94701",
    "94702",
    "94703",
    "94704",
    "94705",
    "94707",
    "94708",
    "94709",
    "94710",
    "94712",
    "94720",
  ];
  var code_brentwood = ["20722", "94513"];
  var code_brisbane = "94005";
  var code_burlingame = ["94010", "94011"];
  var code_byron = "94514";
  var code_campbell = ["95008", "95009", "95011"];
  var code_canyon = "94516";
  var code_capitola = "95010";
  var code_castro_valley = ["94546", "94552"];
  var code_clayton = ["94517", "27520", "27527", "27528"];
  var code_concord = [
    "94518",
    "94519",
    "94520",
    "94521",
    "94522",
    "94524",
    "94527",
    "94529",
  ];
  var code_corte_madera = ["94925", "94976"];
  var code_coyote = "95013";
  var code_crockett = "94525";
  var code_cupertino = "95015";
  var code_daly_city = ["94014", "94015", "94016", "94017"];
  var code_danville = ["94506", "94526"];
  var code_diablo = "94528";
  var code_dublin = "94568";
  var code_el_cerrito = "94530";
  var code_el_granada = "94018";
  var code_el_sobrante = ["94803", "94820"];
  var code_emeryville = ["94608", "94662"];
  var code_fremont = ["94536", "94537", "94538", "94555"];
  var code_gilroy = ["95020", "95021"];
  var code_greenbrae = "94904";
  var code_half_moon_bay = "94019";
  var code_hayward = [
    "94540",
    "94541",
    "94542",
    "94543",
    "94544",
    "94545",
    "94557",
  ];
  var code_hercules = "94547";
  var code_kentfield = "94914";
  var code_lafayette = "94549";
  var code_larkspur = ["94939", "94977"];
  var code_livermore = "94551";
  var code_los_altos = ["94022", "94023", "94024"];
  var code_los_gatos = ["95030", "95031", "95032"];
  var code_martinez = "94553";
  var code_menlo_park = ["94025", "94026"];
  var code_mill_valley = "94942";
  var code_millbrae = "94030";
  var code_milpitas = ["95035", "95036"];
  var code_montara = "94037";
  var code_moraga = ["94556", "94570", "94575"];
  var code_morgan_hill = ["95037", "95038"];
  var code_moss_beach = "94038";
  var code_mountain_view = [
    "94035",
    "94039",
    "94040",
    "94041",
    "94042",
    "94043",
  ];
  var code_newark = "94560";
  var code_oakland = [
    "94601",
    "94602",
    "94603",
    "94604",
    "94605",
    "94606",
    "94607",
    "94609",
    "94610",
    "94611",
    "94612",
    "94613",
    "94614",
    "94615",
    "94617",
    "94618",
    "94619",
    "94621",
    "94622",
    "94623",
    "94624",
    "94649",
    "94659",
    "94660",
    "94661",
    "94666",
  ];
  var code_orinda = "94563";
  var code_pacifica = "94044";
  var code_palo_alto = ["94301", "94302", "94303", "94304", "94306", "94309"];
  var code_piedmont = "94620";
  var code_pinole = "94564";
  var code_pittsburg = "94565";
  var code_pleasant_hill = "94523";
  var code_pleasanton = ["94566", "94588"];
  var code_port_costa = "94569";
  var code_redwood_city = ["94061", "94063", "94064", "94065"];
  var code_richmond = [
    "94801",
    "94802",
    "94804",
    "94805",
    "94807",
    "94808",
    "94850",
    "77406",
    "77407",
    "77469",
  ];
  var code_rodeo = "94572";
  var code_ross = "94957";
  var code_san_anselmo = "94979";
  var code_san_bruno = "94066";
  var code_san_carlos = "94070";
  var code_san_francisco = [
    "94102",
    "94103",
    "94104",
    "94105",
    "94107",
    "94108",
    "94109",
    "94110",
    "94111",
    "94112",
    "94114",
    "94115",
    "94116",
    "94117",
    "94118",
    "94119",
    "94120",
    "94121",
    "94122",
    "94123",
    "94124",
    "94125",
    "94126",
    "94127",
    "94128",
    "94129",
    "94131",
    "94132",
    "94133",
    "94134",
    "94137",
    "94139",
    "94140",
    "94141",
    "94142",
    "94143",
    "94144",
    "94145",
    "94146",
    "94147",
    "94151",
    "94158",
    "94159",
    "94160",
    "94161",
    "94163",
    "94164",
    "94172",
    "94177",
    "94188",
  ];
  var code_san_jose = [
    "95101",
    "95103",
    "95106",
    "95108",
    "95109",
    "95110",
    "95111",
    "95112",
    "95113",
    "95115",
    "95116",
    "95117",
    "95118",
    "95119",
    "95121",
    "95122",
    "95123",
    "95124",
    "95125",
    "95126",
    "95127",
    "95128",
    "95129",
    "95130",
    "95131",
    "95132",
    "95133",
    "95134",
    "95135",
    "95136",
    "95138",
    "95139",
    "95141",
    "95148",
    "95150",
    "95151",
    "95152",
    "95153",
    "95154",
    "95155",
    "95156",
    "95157",
    "95158",
    "95159",
    "95160",
    "95161",
    "95164",
    "95170",
    "95172",
    "95173",
    "95190",
    "95191",
    "95192",
    "95193",
    "95194",
    "95196",
  ];
  var code_san_leandro = ["94577", "94578", "94579"];
  var code_lorenzo = "94580";
  var code_san_martin = "95046";
  var code_san_mateo = ["94401", "94402", "94403", "94404", "94497"];
  var code_san_pablo = "94806";
  var code_san_quentin = ["94964", "94974"];
  var code_san_rafael = ["94901", "94912", "94913", "94915"];
  var code_san_ramon = ["94582", "94583"];
  var code_santa_clara = [
    "95050",
    "95051",
    "95052",
    "95053",
    "95054",
    "95055",
    "95056",
  ];
  var code_santa_cruz = ["95061", "95062", "95063"];
  var code_saratoga = "95071";
  var code_sausalito = "94966";
  var code_scotts_valley = "95067";
  var code_south_san_francisco = ["94080", "94083"];
  var code_stanford = "94305";
  var code_sunnyvale = ["94085", "94086", "94087", "94088", "94089"];
  var code_sunol = "94586";
  var code_tracy = "95391";
  var code_union_city = "94587";
  var code_vallejo = ["94589", "94590", "94591"];
  var code_walnut_creek = ["94595", "94596", "94597", "94598"];
  var code_bonita = ["91902", "91908"];
  var code_bonsall = "92003";
  var code_cardiff_by_the_sea = "92007";
  var code_carlsbad = ["92008", "92009", "92010", "92011", "92013", "92018"];
  var code_chula_vista = [
    "91909",
    "91910",
    "91911",
    "91912",
    "91913",
    "91914",
    "91915",
    "91921",
  ];
  var code_coronado = ["92118", "92178"];
  var code_del_mar = "92014";
  var code_el_cajon = ["92020", "92022"];
  var code_encinitas = ["92023", "92024"];
  var code_escondido = ["92025", "92029", "92030", "92033", "92046"];
  var code_fallbrook = "92088";
  var code_imperial_beach = ["91932", "91933"];
  var code_la_jolla = ["92037", "92038", "92039", "92092", "92093"];
  var code_la_mesa = ["91941", "91942", "91943", "91944"];
  var code_lemon_grove = ["91945", "91946"];
  var code_national_city = ["91950", "91951"];
  var code_oceanside = [
    "92049",
    "92051",
    "92052",
    "92054",
    "92056",
    "92057",
    "92058",
  ];
  var code_poway = ["92064", "92074"];
  var code_rancho_santa_fe = ["92067", "92091"];
  var code_san_diego = [
    "92101",
    "92102",
    "92103",
    "92104",
    "92105",
    "92106",
    "92107",
    "92108",
    "92109",
    "92110",
    "92111",
    "92112",
    "92113",
    "92114",
    "92115",
    "92116",
    "92117",
    "92119",
    "92120",
    "92121",
    "92122",
    "92123",
    "92124",
    "92126",
    "92127",
    "92128",
    "92129",
    "92130",
    "92131",
    "92132",
    "92134",
    "92135",
    "92136",
    "92137",
    "92138",
    "92139",
    "92140",
    "92142",
    "92145",
    "92147",
    "92149",
    "92150",
    "92152",
    "92153",
    "92154",
    "92155",
    "92158",
    "92159",
    "92160",
    "92161",
    "92163",
    "92165",
    "92166",
    "92167",
    "92168",
    "92169",
    "92170",
    "92171",
    "92172",
    "92174",
    "92175",
    "92176",
    "92177",
    "92179",
    "92182",
    "92186",
    "92187",
    "92191",
    "92192",
    "92193",
    "92195",
    "92196",
    "92197",
    "92198",
    "92199",
  ];
  var code_san_luis_rey = "92068";
  var code_san_marcos = ["92069", "92078", "92079", "92096"];
  var code_san_ysidro = ["92143", "92173"];
  var code_santee = ["92071", "92072"];
  var code_solana_beach = "92075";
  var code_spring_valley = ["91976", "91977", "91979"];
  var code_vista = ["92081", "92083", "92084", "92085"];
  var code_aliso_viejo = "92656";
  var code_bloomington = "92316";
  var code_bryn_mawr = "92318";
  var code_buena_park = "90622";
  var code_capistrano_beach = "92624";
  var code_chino = ["91708", "91710"];
  var code_claremont = "91711";
  var code_colton = "92324";
  var code_corona = ["92877", "92878", "92879", "92880", "92881"];
  var code_dana_point = "92629";
  var code_el_toro = "92609";
  var code_fontana = ["92331", "92334", "92335", "92336", "92337"];
  var code_grand_terrace = "92313";
  var code_guasti = "91743";
  var code_highland = ["20777", "92346"];
  var code_irvine = "92618";
  var code_ladera_ranch = "92694";
  var code_laguna_beach = ["92651", "92652"];
  var code_laguna_hills = ["92653", "92654"];
  var code_laguna_niguel = ["92607", "92677"];
  var code_laguna_woods = "92637";
  var code_lake_forest = "92630";
  var code_loma_linda = ["92350", "92354", "92357"];
  var code_march_air_reserve_base = "92518";
  var code_mira_loma = "91752";
  var code_mission_viejo = ["92690", "92691", "92692"];
  var code_montclair = "91763";
  var code_moreno_valley = [
    "92551",
    "92553",
    "92554",
    "92555",
    "92556",
    "92557",
  ];
  var code_norco = "92860";
  var code_ontario = ["91758", "91761", "91762", "91764"];
  var code_patton = "92369";
  var code_perris = ["92570", "92571", "92572", "92599"];
  var code_pomona = ["91766", "91767", "91768", "91769"];
  var code_ranco_cucamonga = ["91701", "91729", "91730", "91737", "91739"];
  var code_rancho_santa_margarita = "92688";
  var code_redlands = ["92373", "92374", "92375"];
  var code_rialto = ["92376", "92377"];
  var code_riverside = [
    "92501",
    "92502",
    "92503",
    "92504",
    "92505",
    "92506",
    "92507",
    "92508",
    "92509",
    "92513",
    "92514",
    "92516",
    "92517",
    "92519",
    "92521",
    "92522",
  ];
  var code_san_bernardino = [
    "92401",
    "92402",
    "92403",
    "92405",
    "92406",
    "92408",
    "92410",
    "92411",
    "92413",
    "92415",
    "92418",
    "92423",
    "92427",
  ];
  var code_san_clemente = ["92673", "92674"];
  var code_san_dimas = "91773";
  var code_san_juan_capistrano = "92693";
  var code_upland = ["91784", "91785", "91786"];
  var code_arvada = [
    "80001",
    "80002",
    "80003",
    "80004",
    "80005",
    "80006",
    "80007",
  ];
  var code_aurora = [
    "80010",
    "80011",
    "80012",
    "80013",
    "80014",
    "80015",
    "80017",
    "80040",
    "80041",
    "80042",
    "80044",
    "80045",
    "80046",
    "80047",
  ];
  var code_boulder = [
    "80301",
    "80304",
    "80305",
    "80306",
    "80307",
    "80308",
    "80309",
    "80310",
    "80314",
  ];
  var code_brighton = "80602";
  var code_broomfield = ["80020", "80021", "80023", "80038"];
  var code_commerce_city = ["80022", "80037"];
  var code_denver = [
    "80201",
    "80202",
    "80203",
    "80204",
    "80205",
    "80206",
    "80207",
    "80208",
    "80209",
    "80210",
    "80211",
    "80212",
    "80216",
    "80217",
    "80218",
    "80219",
    "80220",
    "80221",
    "80222",
    "80223",
    "80224",
    "80229",
    "80230",
    "80231",
    "80233",
    "80234",
    "80236",
    "80237",
    "80238",
    "80239",
    "80241",
    "80243",
    "80244",
    "80246",
    "80247",
    "80248",
    "80250",
    "80251",
    "80256",
    "80257",
    "80259",
    "80260",
    "80261",
    "80262",
    "80263",
    "80264",
    "80265",
    "80266",
    "80271",
    "80273",
    "80274",
    "80281",
    "80290",
    "80291",
    "80293",
    "80294",
    "80299",
  ];
  var code_dupont = "80024";
  var code_eastlake = "80614";
  var code_englewood = ["80110", "80111", "80113", "80150", "80151", "80155"];
  var code_littleton = [
    "80120",
    "80121",
    "80122",
    "80126",
    "80129",
    "80130",
    "80160",
    "80161",
    "80163",
    "80165",
    "80166",
  ];
  var code_westminster = ["80030", "80031", "80035", "80036"];
  var code_blue_diamond = "89004";
  var code_boulder_city = ["89005", "89006"];
  var code_bunkerville = "89007";
  var code_cal_nev_ari = "89039";
  var code_coyote_springs = ["89037", "89067"];
  var code_henderson = [
    "80640",
    "89002",
    "89009",
    "89011",
    "89012",
    "89014",
    "89015",
    "89016",
    "89044",
    "89052",
    "89053",
    "89074",
    "89077",
  ];
  var code_indian_springs = ["89018", "89070"];
  var code_jean = ["89019", "89026"];
  var code_las_vegas = [
    "89101",
    "89102",
    "89103",
    "89104",
    "89105",
    "89106",
    "89107",
    "89108",
    "89109",
    "89110",
    "89111",
    "89112",
    "89113",
    "89114",
    "89115",
    "89116",
    "89117",
    "89118",
    "89119",
    "89120",
    "89121",
    "89122",
    "89123",
    "89124",
    "89125",
    "89126",
    "89127",
    "89128",
    "89129",
    "89130",
    "89131",
    "89132",
    "89133",
    "89134",
    "89135",
    "89136",
    "89137",
    "89138",
    "89139",
    "89140",
    "89141",
    "89142",
    "89143",
    "89144",
    "89145",
    "89146",
    "89147",
    "89148",
    "89149",
    "89150",
    "89151",
    "89152",
    "89153",
    "89154",
    "89155",
    "89156",
    "89157",
    "89159",
    "89160",
    "89161",
    "89162",
    "89164",
    "89165",
    "89166",
    "89169",
    "89170",
    "89173",
    "89177",
    "89178",
    "89179",
    "89180",
    "89183",
    "89185",
    "89193",
    "89195",
    "89199",
  ];
  var code_laughlin = ["89028", "89029"];
  var code_logandale = "89021";
  var code_mesquite = ["89024", "89027", "89034"];
  var code_moapa = "89025";
  var code_nellis_afb = "89191";
  var code_north_las_vegas = [
    "89030",
    "89031",
    "89032",
    "89033",
    "89036",
    "89081",
    "89084",
    "89085",
    "89086",
    "89087",
  ];
  var code_overton = "89040";
  var code_searchlight = "89046";
  var code_sloan = "89054";
  var code_the_lakes = ["88901", "88905", "89163"];
  var code_accokeek = "20607";
  var code_andrews_air_force_base = "20762";
  var code_annapolis = ["21401", "21402", "21403", "21404", "21405", "21409"];
  var code_annapolis_junction = "20701";
  var code_aquasco = "20608";
  var code_arnold = ["21012", "63010"];
  var code_ashton = "20861";
  var code_baltimore = "21240";
  var code_barnesville = "20838";
  var code_beallsville = "20839";
  var code_beltsville = ["20704", "20705"];
  var code_bethesda = [
    "20813",
    "20814",
    "20816",
    "20817",
    "20824",
    "20827",
    "20889",
  ];
  var code_bladensburg = "20710";
  var code_bowie = [
    "20715",
    "20716",
    "20717",
    "20718",
    "20719",
    "20720",
    "20721",
  ];
  var code_boyds = "20841";
  var code_brandywine = "20613";
  var code_brinklow = "20862";
  var code_brookeville = "20833";
  var code_burtonsville = "20866";
  var code_cabin_john = "20818";
  var code_capitol_heights = ["20731", "20743", "20791"];
  var code_cheltenham = "20623";
  var code_chevy_chase = ["20815", "20825"];
  var code_churchton = "20733";
  var code_clarksville = "21029";
  var code_clinton = "20735";
  var code_college_park = ["20740", "20741", "20742"];
  var code_columbia = ["21044", "21045", "21046"];
  var code_cooksville = "21723";
  var code_crofton = "21114";
  var code_crownsville = "21032";
  var code_curtis_bay = "21226";
  var code_damascus = "20872";
  var code_davidsonville = "21035";
  var code_dayton = "21036";
  var code_deale = "20751";
  var code_derwood = "20855";
  var code_dickerson = "20842";
  var code_district_heights = ["20747", "20753"];
  var code_edgewater = "21037";
  var code_elkridge = "21075";
  var code_ellicott_city = ["21041", "21042", "21043"];
  var code_fort_george = "20755";
  var code_fort_washington = ["20744", "20749"];
  var code_friendship = "20758";
  var code_fulton = "20759";
  var code_gaithersburg = [
    "20877",
    "20878",
    "20879",
    "20882",
    "20883",
    "20884",
    "20885",
    "20898",
  ];
  var code_galesville = "20765";
  var code_gambrills = "21054";
  var code_garrett_park = "20896";
  var code_germantown = ["20874", "20875", "20876"];
  var code_gibson_island = "21056";
  var code_glen_burnie = ["21060", "21061"];
  var code_glen_echo = "20812";
  var code_glenelg = "21737";
  var code_glenn_dale = "20769";
  var code_glenwood = "21738";
  var code_greenbelt = ["20768", "20770", "20771"];
  var code_hanover = "21076";
  var code_harmans = "21077";
  var code_harwood = "20776";
  var code_hyattsville = [
    "20781",
    "20782",
    "20783",
    "20784",
    "20785",
    "20787",
    "20788",
  ];
  var code_jessup = "20794";
  var code_kensington = ["20891", "20895"];
  var code_lanham = ["20703", "20706"];
  var code_laurel = [
    "20707",
    "20708",
    "20709",
    "20723",
    "20724",
    "20725",
    "20726",
  ];
  var code_linthicum_heights = "21090";
  var code_lisbon = "21765";
  var code_mayo = "21106";
  var code_millersville = "21108";
  var code_montgomery_village = "20886";
  var code_mount_rainier = "20712";
  var code_odenton = "21113";
  var code_olney = ["20830", "20832"];
  var code_oxon_hill = ["20745", "20750"];
  var code_poolesville = "20837";
  var code_potomac = ["20854", "20859"];
  var code_riva = "21140";
  var code_riverdale = ["20737", "20738"];
  var code_rockville = [
    "20847",
    "20848",
    "20849",
    "20850",
    "20851",
    "20852",
    "20853",
  ];
  var code_sandy_spring = "20860";
  var code_savage = "20763";
  var code_severn = "21144";
  var code_severna_park = "21146";
  var code_shady_side = "20764";
  var code_silver_spring = [
    "20901",
    "20902",
    "20903",
    "20904",
    "20905",
    "20906",
    "20907",
    "20908",
    "20910",
    "20911",
    "20914",
    "20915",
    "20916",
    "20918",
  ];
  var code_simpsonville = "21150";
  var code_spencerville = "20868";
  var code_suitland = ["20746", "20752"];
  var code_takoma_park = ["20912", "20913"];
  var code_temple_hills = ["20748", "20757"];
  var code_tracys_landing = "20779";
  var code_upper_marlboro = ["20772", "20773", "20774", "20775", "20792"];
  var code_washington_grove = "20880";
  var code_west_friendship = "21794";
  var code_west_river = "20778";
  var code_woodbine = "21797";
  var code_woodstock = "21163"; // End postal codes for major services

  // Start subsidiary services --> RAVE
  var code_austin = [
    "73301",
    "73344",
    "78701",
    "78702",
    "78703",
    "78704",
    "78705",
    "78708",
    "78709",
    "78710",
    "78711",
    "78712",
    "78713",
    "78714",
    "78715",
    "78716",
    "78717",
    "78718",
    "78719",
    "78720",
    "78721",
    "78723",
    "78724",
    "78725",
    "78726",
    "78727",
    "78728",
    "78729",
    "78730",
    "78731",
    "78732",
    "78733",
    "78734",
    "78735",
    "78736",
    "78737",
    "78738",
    "78739",
    "78741",
    "78742",
    "78744",
    "78745",
    "78746",
    "78747",
    "78748",
    "78749",
    "78750",
    "78751",
    "78752",
    "78753",
    "78754",
    "78755",
    "78757",
    "78758",
    "78759",
    "78760",
    "78761",
    "78762",
    "78763",
    "78764",
    "78765",
    "78766",
    "78767",
    "78768",
    "78772",
    "78773",
    "78774",
    "78778",
    "78779",
    "78783",
    "78799",
  ];
  var code_bastrop = "78602";
  var code_buda = "78610";
  var code_cedar_creek = ["78612", "78613"];
  var code_cedar_park = "78613";
  var code_corpus_christi = ["78402", "78411", "78414"];
  var code_coupland = "78615";
  var code_del_valle = "78617";
  var code_dripping_srpings = "78620";
  var code_elgin = "78621";
  var code_florence = "76527";
  var code_georgetown = ["78626", "78627", "78628", "78633"];
  var code_harker_heights = "76548";
  var code_hutto = "78634";
  var code_jarrell = "76537";
  var code_killeen = ["76542", "76549"];
  var code_kyle = "78640";
  var code_leander = ["78641", "78645", "78646"];
  var code_liberty_hill = "78642";
  var code_manchaca = "78652";
  var code_manor = "78653";
  var code_pflugerville = "78660";
  var code_roundrock = ["78664", "78665", "78681"];
  var code_salado = "76571";
  var code_taylor = "76574";
  var code_temple = "76502"; // End subsidiary services --> RAVE

  // Start subsidiary services --> COMPLETE
  var code_alief = "77411";
  var code_alvin = ["77511", "77512"];
  var code_angleton = "77515";
  var code_bacliff = "77518";
  var code_barker = "77413";
  var code_baytown = ["77520", "77521", "77522", "77523"];
  var code_bellaire = ["77401", "77402"];
  var code_channelview = "77530";
  var code_conroe = ["77301", "77302", "77303", "77304", "77385"];
  var code_crosby = "77532";
  var code_cypress = ["77429", "77433"];
  var code_deer_park = "77536";
  var code_dickinson = "77539";
  var code_freeport = "77541";
  var code_fresno = "77545";
  var code_friendswood = ["77546", "77549"];
  var code_gelena_park = "77547";
  var code_hempstead = "77445";
  var code_highlands = "77562";
  var code_hitchcock = "77563";
  var code_houston = [
    "77001",
    "77002",
    "77003",
    "77004",
    "77005",
    "77006",
    "77007",
    "77008",
    "77009",
    "77010",
    "77011",
    "77012",
    "77013",
    "77014",
    "77015",
    "77016",
    "77017",
    "77018",
    "77019",
    "77020",
    "77021",
    "77022",
    "77023",
    "77024",
    "77025",
    "77026",
    "77027",
    "77028",
    "77029",
    "77030",
    "77031",
    "77032",
    "77033",
    "77034",
    "77035",
    "77036",
    "77037",
    "77038",
    "77039",
    "77040",
    "77041",
    "77042",
    "77043",
    "77044",
    "77045",
    "77046",
    "77047",
    "77048",
    "77049",
    "77050",
    "77051",
    "77052",
    "77053",
    "77054",
    "77055",
    "77056",
    "77057",
    "77058",
    "77059",
    "77060",
    "77061",
    "77062",
    "77063",
    "77064",
    "77065",
    "77066",
    "77067",
    "77068",
    "77069",
    "77070",
    "77071",
    "77072",
    "77073",
    "77074",
    "77075",
    "77076",
    "77077",
    "77078",
    "77079",
    "77080",
    "77081",
    "77082",
    "77083",
    "77084",
    "77085",
    "77086",
    "77087",
    "77088",
    "77089",
    "77090",
    "77091",
    "77092",
    "77093",
    "77094",
    "77095",
    "77096",
    "77098",
    "77099",
    "77201",
    "77202",
    "77203",
    "77204",
    "77205",
    "77206",
    "77207",
    "77208",
    "77209",
    "77210",
    "77212",
    "77213",
    "77215",
    "77216",
    "77217",
    "77218",
    "77219",
    "77220",
    "77221",
    "77222",
    "77223",
    "77224",
    "77225",
    "77226",
    "77227",
    "77228",
    "77229",
    "77230",
    "77231",
    "77233",
    "77234",
    "77235",
    "77236",
    "77237",
    "77238",
    "77240",
    "77241",
    "77242",
    "77243",
    "77244",
    "77245",
    "77248",
    "77249",
    "77251",
    "77252",
    "77253",
    "77254",
    "77255",
    "77256",
    "77257",
    "77258",
    "77259",
    "77261",
    "77262",
    "77263",
    "77265",
    "77266",
    "77267",
    "77268",
    "77269",
    "77270",
    "77271",
    "77272",
    "77273",
    "77274",
    "77275",
    "77277",
    "77279",
    "77280",
    "77282",
    "77284",
    "77287",
    "77288",
    "77289",
    "77290",
    "77291",
    "77292",
    "77293",
    "77297",
    "77299",
  ];
  var code_huffman = "77336";
  var code_humble = ["77338", "77346", "77347", "77396"];
  var code_katy = ["77449", "77450", "77493", "77494"];
  var code_kemah = "77565";
  var code_kingwood = ["77325", "77339", "77345"];
  var code_la_marque = "77568";
  var code_la_porte = ["77571", "77572"];
  var code_league_city = ["77573", "77574"];
  var code_liverpool = "77577";
  var code_manvel = "77578";
  var code_missouri_city = ["77459", "77489"];
  var code_north_houston = "77315";
  var code_pearland = ["77581", "77584", "77588"];
  var code_porter = "77365";
  var code_rosenberg = "77471";
  var code_rosharon = "77583";
  var code_santa_fe = ["77510", "77517"];
  var code_seabrook = "77586";
  var code_south_houston = "77587";
  var code_spring = ["77373", "77379", "77380", "77386", "77388", "77389"];
  var code_stafford = ["77477", "77497"];
  var code_sugar_land = ["77478", "77479", "77487", "77498"];
  var code_texas_city = ["77590", "77591"];
  var code_thompsons = "77481";
  var code_tomball = ["77375", "77377"];
  var code_waller = "77484";
  var code_webster = "77598";
  var code_west_columbia = "77486"; // End subsidiary services --> COMPLETE

  // Start subsidiary services --> CREEKBEND
  var code_charleston = [
    "29401",
    "29403",
    "29406",
    "29407",
    "29412",
    "29492",
    "29404",
  ];
  var code_folly_beach = "29439";
  var code_goose_creek = "29445";
  var code_hanahan = "29410";
  var code_isle_of_palms = "29451";
  var code_johns_island = "29455";
  var code_ladson = "29456";
  var code_moncks_corner = "29461";
  var code_mount_pleasant = ["29464", "29466"];
  var code_north_charleston = ["29405", "29418", "29420"];
  var code_sullivan_island = "29482";
  var code_summerville = ["29483", "29485"]; // End subsidiary services --> CREEKBEND

  // Start subsidiary services --> RADIUS
  var code_annada = "63330";
  var code_augusta = "63332";
  var code_ballwin = ["63011", "63021"];
  var code_barnhart = "63012";
  var code_beaufort = "63013";
  var code_bridgeton = "63044";
  var code_catawissa = "63015";
  var code_cedar_hill = "63016";
  var code_chesterfield = ["63005", "63017"];
  var code_crystal_city = "63019";
  var code_de_soto = "63020";
  var code_defiance = "63341";
  var code_dittmer = "63023";
  var code_dutzow = "63342";
  var code_earth_city = "63045";
  var code_elsberry = "63343";
  var code_eolia = "63344";
  var code_eureka = "63025";
  var code_fenton = "63026";
  var code_festus = "63028";
  var code_fletcher = "63030";
  var code_flinthill = "63346";
  var code_florissant = ["63031", "63033", "63034"];
  var code_foley = "63347";
  var code_foristell = "63348";
  var code_french_village = "63036";
  var code_gerald = "63037";
  var code_glencoe = "63038";
  var code_gray_summit = "63039";
  var code_grover = "63040";
  var code_grubville = "63041";
  var code_hawk_point = "63349";
  var code_hazelwood = "63042";
  var code_herculaneum = "63048";
  var code_high_hill = "63350";
  var code_high_ridge = "63049";
  var code_hillsboro = "63050";
  var code_house_springs = "63051";
  var code_imperial = "63052";
  var code_jonesburg = "63351";
  var code_kimmswick = "63053";
  var code_labadie = "63055";
  var code_lake_saint_louis = "63367";
  var code_leslie = "63056";
  var code_liguori = "63057";
  var code_lonedell = "63060";
  var code_luebbering = "63061";
  var code_mapaville = "63065";
  var code_marthasville = "63357";
  var code_maryland_heights = "63043";
  var code_montgomery_city = "63361";
  var code_moscow_mills = "63362";
  var code_new_florence = "63363";
  var code_new_haven = "63068";
  var code_new_melle = "63365";
  var code_o_fallon = ["63366", "63368"];
  var code_old_monroe = "63369";
  var code_pacific = "63069";
  var code_pevely = "63070";
  var code_portage_des_sioux = "63373";
  var code_richwoods = "63071";
  var code_robertsville = "63072";
  var code_saint_albans = "63073";
  var code_saint_ann = "63074";
  var code_saint_charles = ["63301", "63303", "63304"];
  var code_saint_clair = "63077";
  var code_saint_louis = [
    "63101",
    "63102",
    "63103",
    "63104",
    "63105",
    "63106",
    "63107",
    "63108",
    "63109",
    "63110",
    "63111",
    "63112",
    "63113",
    "63114",
    "63115",
    "63116",
    "63117",
    "63118",
    "63119",
    "63120",
    "63121",
    "63122",
    "63123",
    "63124",
    "63125",
    "63126",
    "63127",
    "63128",
    "63129",
    "63130",
    "63131",
    "63132",
    "63133",
    "63134",
    "63135",
    "63136",
    "63137",
    "63138",
    "63139",
    "63140",
    "63141",
    "63143",
    "63144",
    "63145",
    "63146",
    "63147",
  ];
  var code_saint_peters = "63376";
  var code_silex = "63377";
  var code_stanton = "63079";
  var code_sullivan = "63080";
  var code_troy = "63379";
  var code_truxton = "63381";
  var code_union = "63084";
  var code_valles_mines = "63087";
  var code_valley_park = "63088";
  var code_villa_ridge = "63089";
  var code_warrenton = "63383";
  var code_washington = "63090";
  var code_wentzville = "63385";
  var code_west_alton = "63386";
  var code_whiteside = "63387";
  var code_winfield = "63389";
  var code_wright_city = "63390"; // End subsidiary services --> RADIUS

  // Start subsidiary services --> RENTSAFE
  var code_apex = ["27502", "27523", "27539"];
  var code_cary = ["27511", "27512", "27513", "27518", "27519"];
  var code_chapel_hill = "27517";
  var code_durham = [
    "27701",
    "27702",
    "27703",
    "27704",
    "27706",
    "27707",
    "27708",
    "27709",
    "27710",
    "27711",
    "27713",
    "27715",
    "27717",
    "27722",
  ];
  var code_fuquay_varina = "27526";
  var code_garner = "27529";
  var code_holly_springs = "27540";
  var code_knightdale = "27545";
  var code_moncure = "27559";
  var code_morrisville = "27560";
  var code_new_hill = "27562";
  var code_raleigh = [
    "27601",
    "27602",
    "27603",
    "27604",
    "27605",
    "27606",
    "27607",
    "27608",
    "27609",
    "27610",
    "27611",
    "27612",
    "27613",
    "27614",
    "27615",
    "27616",
    "27617",
    "27619",
    "27620",
    "27622",
    "27623",
    "27624",
    "27625",
    "27626",
    "27627",
    "27628",
    "27629",
    "27634",
    "27635",
    "27636",
    "27640",
    "27650",
    "27656",
    "27658",
    "27661",
    "27668",
    "27675",
    "27676",
    "27690",
    "27695",
    "27697",
    "27698",
    "27699",
  ];
  var code_rolesville = "27571";
  var code_wake_forest = ["27587", "27588"];
  var code_wendell = "27591";
  var code_willow_spring = "27592";
  var code_zebulon = "27597"; // End subsidiary services --> RENTSAFE

  // Checking of inputs
  var location_input = document.getElementById("pac_input").value.toLowerCase();
  var postal_input = document.getElementById("rent-estimate_input-postal-code").value;
  var property_type = document.getElementById("property-type").value;
  var footer_main = document.getElementById("footer-main");
  // Modal lists
  var modal_serviced = document.getElementById("serviced-block_trigger-layer");
  var modal_subsidiary = document.getElementById("subsidiary-block_trigger-layer");
  var modal_unserviced = document.getElementById("unserviced-block_trigger-layer");
  var modal_mismatch = document.getElementById("mismatch-block_trigger-layer");
  var modal_empty = document.getElementById("emptyfield-block_trigger-layer");

  // Hide footer-main when Rent Estimate button is clicked
  footer_main.style.display = "none";

  // first statement for poplar services
  if (postal_input.length < 1 || location_input.length < 1) {
    modal_empty.style.display = "block";
  } else if (
    (code_portland.includes(postal_input) &&
      location_input.includes("portland") &&
      property_type.length != 0) ||
    (code_eugene.includes(postal_input) &&
      location_input.includes("eugene") &&
      property_type.length != 0) ||
    (code_nashville.includes(postal_input) &&
      location_input.includes("nashville") &&
      property_type.length != 0) ||
    (code_antelope.includes(postal_input) &&
      location_input.includes("antelope") &&
      property_type.length != 0) ||
    (code_carmichael.includes(postal_input) &&
      location_input.includes("carmichael") &&
      property_type.length != 0) ||
    (code_citrus_heights.includes(postal_input) &&
      location_input.includes("citrus heights") &&
      property_type.length != 0) ||
    (code_clarksburg.includes(postal_input) &&
      location_input.includes("clarksburg") &&
      property_type.length != 0) ||
    (code_davis.includes(postal_input) &&
      location_input.includes("davis") &&
      property_type.length != 0) ||
    (code_el_dorado_hills.includes(postal_input) &&
      location_input.includes("el dorado") &&
      property_type.length != 0) ||
    (code_elk_grove.includes(postal_input) &&
      location_input.includes("elk grove") &&
      property_type.length != 0) ||
    (code_elverta.includes(postal_input) &&
      location_input.includes("elverta") &&
      property_type.length != 0) ||
    (code_fair_oaks.includes(postal_input) &&
      location_input.includes("fair oaks") &&
      property_type.length != 0) ||
    (code_folsom.includes(postal_input) &&
      location_input.includes("folsom") &&
      property_type.length != 0) ||
    (code_granite_bay.includes(postal_input) &&
      location_input.includes("granite bay") &&
      property_type.length != 0) ||
    (code_hood.includes(postal_input) &&
      location_input.includes("hood") &&
      property_type.length != 0) ||
    (code_mather.includes(postal_input) &&
      location_input.includes("mather") &&
      property_type.length != 0) ||
    (code_mcclellan.includes(postal_input) &&
      location_input.includes("mcclellan") &&
      property_type.length != 0) ||
    (code_north_highlands.includes(postal_input) &&
      location_input.includes("north highlands") &&
      property_type.length != 0) ||
    (code_orangevale.includes(postal_input) &&
      location_input.includes("orangevale") &&
      property_type.length != 0) ||
    (code_rancho_cordova.includes(postal_input) &&
      location_input.includes("rancho cordova") &&
      property_type.length != 0) ||
    (code_represa.includes(postal_input) &&
      location_input.includes("represa") &&
      property_type.length != 0) ||
    (code_rescue.includes(postal_input) &&
      location_input.includes("rescue") &&
      property_type.length != 0) ||
    (code_rio_linda.includes(postal_input) &&
      location_input.includes("rio linda") &&
      property_type.length != 0) ||
    (code_rocklin.includes(postal_input) &&
      location_input.includes("rocklin") &&
      property_type.length != 0) ||
    (code_roseville.includes(postal_input) &&
      location_input.includes("rosevill") &&
      property_type.length != 0) ||
    (code_sacramento.includes(postal_input) &&
      location_input.includes("sacramento") &&
      property_type.length != 0) ||
    (code_west_sacramento.includes(postal_input) &&
      location_input.includes("west sacramento") &&
      property_type.length != 0) ||
    (code_woodland.includes(postal_input) &&
      location_input.includes("woodland") &&
      property_type.length != 0) ||
    (code_yolo.includes(postal_input) &&
      location_input.includes("yolo") &&
      property_type.length != 0) ||
    (code_bellevue.includes(postal_input) &&
      location_input.includes("bellevue") &&
      property_type.length != 0) ||
    (code_bothel.includes(postal_input) &&
      location_input.includes("bothel") &&
      property_type.length != 0) ||
    (code_edmonds.includes(postal_input) &&
      location_input.includes("edmonds") &&
      property_type.length != 0) ||
    (code_everett.includes(postal_input) &&
      location_input.includes("everett") &&
      property_type.length != 0) ||
    (code_issaquah.includes(postal_input) &&
      location_input.includes("issaquah") &&
      property_type.length != 0) ||
    (code_kenmore.includes(postal_input) &&
      location_input.includes("kenmore") &&
      property_type.length != 0) ||
    (code_kent.includes(postal_input) &&
      location_input.includes("kent") &&
      property_type.length != 0) ||
    (code_kirkland.includes(postal_input) &&
      location_input.includes("kirkland") &&
      property_type.length != 0) ||
    (code_lynnwood.includes(postal_input) &&
      location_input.includes("lynnwood") &&
      property_type.length != 0) ||
    (code_medina.includes(postal_input) &&
      location_input.includes("medina") &&
      property_type.length != 0) ||
    (code_mercer_island.includes(postal_input) &&
      location_input.includes("mercer") &&
      property_type.length != 0) ||
    (code_mill_creek.includes(postal_input) &&
      location_input.includes("mill creek") &&
      property_type.length != 0) ||
    (code_mountlake_terrace.includes(postal_input) &&
      location_input.includes("mountlake terrace") &&
      property_type.length != 0) ||
    (code_mukilteo.includes(postal_input) &&
      location_input.includes("mukilteo") &&
      property_type.length != 0) ||
    (code_redmond.includes(postal_input) &&
      location_input.includes("redmond") &&
      property_type.length != 0) ||
    (code_renton.includes(postal_input) &&
      location_input.includes("renton") &&
      property_type.length != 0) ||
    (code_sammamish.includes(postal_input) &&
      location_input.includes("sammamish") &&
      property_type.length != 0) ||
    (code_seahurst.includes(postal_input) &&
      location_input.includes("seahurst") &&
      property_type.length != 0) ||
    (code_seattle.includes(postal_input) &&
      location_input.includes("seattle") &&
      property_type.length != 0) ||
    (code_alhambra.includes(postal_input) &&
      location_input.includes("alhambra") &&
      property_type.length != 0) ||
    (code_altadena.includes(postal_input) &&
      location_input.includes("altadena") &&
      property_type.length != 0) ||
    (code_arcadia.includes(postal_input) &&
      location_input.includes("arcadia") &&
      property_type.length != 0) ||
    (code_bell.includes(postal_input) &&
      location_input.includes("bell") &&
      property_type.length != 0) ||
    (code_bell_gardens.includes(postal_input) &&
      location_input.includes("bell gardens") &&
      property_type.length != 0) ||
    (code_bellflower.includes(postal_input) &&
      location_input.includes("bellflower") &&
      property_type.length != 0) ||
    (code_beverly_hills.includes(postal_input) &&
      location_input.includes("beverly hills") &&
      property_type.length != 0) ||
    (code_burbank.includes(postal_input) &&
      location_input.includes("burbank") &&
      property_type.length != 0) ||
    (code_canoga_park.includes(postal_input) &&
      location_input.includes("canoga park") &&
      property_type.length != 0) ||
    (code_carson.includes(postal_input) &&
      location_input.includes("carson") &&
      property_type.length != 0) ||
    (code_chatsworth.includes(postal_input) &&
      location_input.includes("chatsworth") &&
      property_type.length != 0) ||
    (code_city_of_industry.includes(postal_input) &&
      location_input.includes("city of industry") &&
      property_type.length != 0) ||
    (code_compton.includes(postal_input) &&
      location_input.includes("compton") &&
      property_type.length != 0) ||
    (code_culver_city.includes(postal_input) &&
      location_input.includes("culver") &&
      property_type.length != 0) ||
    (code_dodgertown.includes(postal_input) &&
      location_input.includes("dodgertown") &&
      property_type.length != 0) ||
    (code_downey.includes(postal_input) &&
      location_input.includes("downey") &&
      property_type.length != 0) ||
    (code_duarte.includes(postal_input) &&
      location_input.includes("duarte") &&
      property_type.length != 0) ||
    (code_el_monte.includes(postal_input) &&
      location_input.includes("el monte") &&
      property_type.length != 0) ||
    (code_el_segundo.includes(postal_input) &&
      location_input.includes("el segundo") &&
      property_type.length != 0) ||
    (code_gardena.includes(postal_input) &&
      location_input.includes("gardena") &&
      property_type.length != 0) ||
    (code_glendale.includes(postal_input) &&
      location_input.includes("glendale") &&
      property_type.length != 0) ||
    (code_granada_hills.includes(postal_input) &&
      location_input.includes("granada hills") &&
      property_type.length != 0) ||
    (code_harbor_city.includes(postal_input) &&
      location_input.includes("harbor") &&
      property_type.length != 0) ||
    (code_hawthorne.includes(postal_input) &&
      location_input.includes("hawthorne") &&
      property_type.length != 0) ||
    (code_hermosa_beach.includes(postal_input) &&
      location_input.includes("hermosa beach") &&
      property_type.length != 0) ||
    (code_huntington_park.includes(postal_input) &&
      location_input.includes("huntington park") &&
      property_type.length != 0) ||
    (code_inglewood.includes(postal_input) &&
      location_input.includes("inglewood") &&
      property_type.length != 0) ||
    (code_la_cañada_flintridge.includes(postal_input) &&
      location_input.includes("la cañada flintridge") &&
      property_type.length != 0) ||
    (code_la_crescenta.includes(postal_input) &&
      location_input.includes("la crescenta") &&
      property_type.length != 0) ||
    (code_lakewood.includes(postal_input) &&
      location_input.includes("lakewood") &&
      property_type.length != 0) ||
    (code_lawndale.includes(postal_input) &&
      location_input.includes("lawndale") &&
      property_type.length != 0) ||
    (code_lomita.includes(postal_input) &&
      location_input.includes("lomita") &&
      property_type.length != 0) ||
    (code_long_beach.includes(postal_input) &&
      location_input.includes("long beach") &&
      property_type.length != 0) ||
    (code_los_angeles.includes(postal_input) &&
      location_input.includes("los angeles") &&
      property_type.length != 0) ||
    (code_lynwood.includes(postal_input) &&
      location_input.includes("lynwood") &&
      property_type.length != 0) ||
    (code_manhattan_beach.includes(postal_input) &&
      location_input.includes("manhattan beach") &&
      property_type.length != 0) ||
    (code_marina_del_rey.includes(postal_input) &&
      location_input.includes("marina del rey") &&
      property_type.length != 0) ||
    (code_maywood.includes(postal_input) &&
      location_input.includes("maywood") &&
      property_type.length != 0) ||
    (code_mission_hills.includes(postal_input) &&
      location_input.includes("mission hills") &&
      property_type.length != 0) ||
    (code_monrovia.includes(postal_input) &&
      location_input.includes("monrovia") &&
      property_type.length != 0) ||
    (code_montebello.includes(postal_input) &&
      location_input.includes("montebello") &&
      property_type.length != 0) ||
    (code_monterey_park.includes(postal_input) &&
      location_input.includes("monterey park") &&
      property_type.length != 0) ||
    (code_montrose.includes(postal_input) &&
      location_input.includes("montrose") &&
      property_type.length != 0) ||
    (code_north_hills.includes(postal_input) &&
      location_input.includes("north hills") &&
      property_type.length != 0) ||
    (code_north_hollywood.includes(postal_input) &&
      location_input.includes("hollywood") &&
      property_type.length != 0) ||
    (code_northridge.includes(postal_input) &&
      location_input.includes("northridge") &&
      property_type.length != 0) ||
    (code_pacoima.includes(postal_input) &&
      location_input.includes("pacoima") &&
      property_type.length != 0) ||
    (code_palos_verdes_peninsula.includes(postal_input) &&
      location_input.includes("palos verdes") &&
      property_type.length != 0) ||
    (code_panorama_city.includes(postal_input) &&
      location_input.includes("panorama") &&
      property_type.length != 0) ||
    (code_paramount.includes(postal_input) &&
      location_input.includes("paramount") &&
      property_type.length != 0) ||
    (code_pasadena.includes(postal_input) &&
      location_input.includes("pasadena") &&
      property_type.length != 0) ||
    (code_pico_rivera.includes(postal_input) &&
      location_input.includes("pico rivera") &&
      property_type.length != 0) ||
    (code_playa_del_rey.includes(postal_input) &&
      location_input.includes("playa del rey") &&
      property_type.length != 0) ||
    (code_porter_ranch.includes(postal_input) &&
      location_input.includes("porter ranch") &&
      property_type.length != 0) ||
    (code_rancho_palos_verdes.includes(postal_input) &&
      location_input.includes("rancho palos verdes") &&
      property_type.length != 0) ||
    (code_redondo_beach.includes(postal_input) &&
      location_input.includes("redondo beach") &&
      property_type.length != 0) ||
    (code_reseda.includes(postal_input) &&
      location_input.includes("reseda") &&
      property_type.length != 0) ||
    (code_rosemead.includes(postal_input) &&
      location_input.includes("rosemead") &&
      property_type.length != 0) ||
    (code_san_fernando.includes(postal_input) &&
      location_input.includes("san fernando") &&
      property_type.length != 0) ||
    (code_san_gabriel.includes(postal_input) &&
      location_input.includes("san gabriel") &&
      property_type.length != 0) ||
    (code_san_marino.includes(postal_input) &&
      location_input.includes("san marino") &&
      property_type.length != 0) ||
    (code_san_pedro.includes(postal_input) &&
      location_input.includes("san pedro") &&
      property_type.length != 0) ||
    (code_santa_monica.includes(postal_input) &&
      location_input.includes("santa monica") &&
      property_type.length != 0) ||
    (code_sierra_madre.includes(postal_input) &&
      location_input.includes("sierra madre") &&
      property_type.length != 0) ||
    (code_signal_hill.includes(postal_input) &&
      location_input.includes("signal hill") &&
      property_type.length != 0) ||
    (code_south_el_monte.includes(postal_input) &&
      location_input.includes("south el monte") &&
      property_type.length != 0) ||
    (code_south_gate.includes(postal_input) &&
      location_input.includes("south gate") &&
      property_type.length != 0) ||
    (code_south_pasadena.includes(postal_input) &&
      location_input.includes("south pasadena") &&
      property_type.length != 0) ||
    (code_studio_city.includes(postal_input) &&
      location_input.includes("studio") &&
      property_type.length != 0) ||
    (code_sun_valley.includes(postal_input) &&
      location_input.includes("sun valley") &&
      property_type.length != 0) ||
    (code_sylmar.includes(postal_input) &&
      location_input.includes("sylmar") &&
      property_type.length != 0) ||
    (code_tarzana.includes(postal_input) &&
      location_input.includes("tarzana") &&
      property_type.length != 0) ||
    (code_temple_city.includes(postal_input) &&
      location_input.includes("temple") &&
      property_type.length != 0) ||
    (code_toluca_lake.includes(postal_input) &&
      location_input.includes("toluca lake") &&
      property_type.length != 0) ||
    (code_torrance.includes(postal_input) &&
      location_input.includes("torrance") &&
      property_type.length != 0) ||
    (code_tujunga.includes(postal_input) &&
      location_input.includes("tujunga") &&
      property_type.length != 0) ||
    (code_universal_city.includes(postal_input) &&
      location_input.includes("universal") &&
      property_type.length != 0) ||
    (code_valencia.includes(postal_input) &&
      location_input.includes("valencia") &&
      property_type.length != 0) ||
    (code_valley_village.includes(postal_input) &&
      location_input.includes("valley village") &&
      property_type.length != 0) ||
    (code_van_nuys.includes(postal_input) &&
      location_input.includes("van nuys") &&
      property_type.length != 0) ||
    (code_venice.includes(postal_input) &&
      location_input.includes("venice") &&
      property_type.length != 0) ||
    (code_verdugo_city.includes(postal_input) &&
      location_input.includes("verdugo") &&
      property_type.length != 0) ||
    (code_west_hills.includes(postal_input) &&
      location_input.includes("west hills") &&
      property_type.length != 0) ||
    (code_west_hollywood.includes(postal_input) &&
      location_input.includes("west hollywood") &&
      property_type.length != 0) ||
    (code_wilmington.includes(postal_input) &&
      location_input.includes("wilmington") &&
      property_type.length != 0) ||
    (code_winnetka.includes(postal_input) &&
      location_input.includes("winnetka") &&
      property_type.length != 0) ||
    (code_woodland_hills.includes(postal_input) &&
      location_input.includes("woodland hills") &&
      property_type.length != 0) ||
    (code_alameda.includes(postal_input) &&
      location_input.includes("alameda") &&
      property_type.length != 0) ||
    (code_alamo.includes(postal_input) &&
      location_input.includes("alamo") &&
      property_type.length != 0) ||
    (code_albany.includes(postal_input) &&
      location_input.includes("albany") &&
      property_type.length != 0) ||
    (code_alviso.includes(postal_input) &&
      location_input.includes("alviso") &&
      property_type.length != 0) ||
    (code_antioch.includes(postal_input) &&
      location_input.includes("antioch") &&
      property_type.length != 0) ||
    (code_atherton.includes(postal_input) &&
      location_input.includes("atherton") &&
      property_type.length != 0) ||
    (postal_input.includes(code_belmont) &&
      location_input.includes("belmont") &&
      property_type.length != 0) ||
    (code_belvedere_tiburon.includes(postal_input) &&
      location_input.includes("tiburon") &&
      property_type.length != 0) ||
    (code_berkeley.includes(postal_input) &&
      location_input.includes("berkeley") &&
      property_type.length != 0) ||
    (code_brentwood.includes(postal_input) &&
      location_input.includes("brentwood") &&
      property_type.length != 0) ||
    (postal_input.includes(code_brisbane) &&
      location_input.includes("brisbane") &&
      property_type.length != 0) ||
    (code_burlingame.includes(postal_input) &&
      location_input.includes("burlingame") &&
      property_type.length != 0) ||
    (code_byron.includes(postal_input) &&
      location_input.includes("byron") &&
      property_type.length != 0) ||
    (code_campbell.includes(postal_input) &&
      location_input.includes("campbell") &&
      property_type.length != 0) ||
    (code_canyon.includes(postal_input) &&
      location_input.includes("canyon") &&
      property_type.length != 0) ||
    (code_capitola.includes(postal_input) &&
      location_input.includes("capitola") &&
      property_type.length != 0) ||
    (code_castro_valley.includes(postal_input) &&
      location_input.includes("castro valley") &&
      property_type.length != 0) ||
    (code_clayton.includes(postal_input) &&
      location_input.includes("clayton") &&
      property_type.length != 0) ||
    (code_concord.includes(postal_input) &&
      location_input.includes("concord") &&
      property_type.length != 0) ||
    (code_corte_madera.includes(postal_input) &&
      location_input.includes("corte madera") &&
      property_type.length != 0) ||
    (code_coyote.includes(postal_input) &&
      location_input.includes("coyote") &&
      property_type.length != 0) ||
    (code_crockett.includes(postal_input) &&
      location_input.includes("crockett") &&
      property_type.length != 0) ||
    (code_cupertino.includes(postal_input) &&
      location_input.includes("cupertino") &&
      property_type.length != 0) ||
    (code_daly_city.includes(postal_input) &&
      location_input.includes("daly") &&
      property_type.length != 0) ||
    (code_danville.includes(postal_input) &&
      location_input.includes("danville") &&
      property_type.length != 0) ||
    (code_diablo.includes(postal_input) &&
      location_input.includes("diablo") &&
      property_type.length != 0) ||
    (code_dublin.includes(postal_input) &&
      location_input.includes("dublin") &&
      property_type.length != 0) ||
    (code_el_cerrito.includes(postal_input) &&
      location_input.includes("el cerrito") &&
      property_type.length != 0) ||
    (code_el_granada.includes(postal_input) &&
      location_input.includes("el granada") &&
      property_type.length != 0) ||
    (code_el_sobrante.includes(postal_input) &&
      location_input.includes("el sobrante") &&
      property_type.length != 0) ||
    (code_emeryville.includes(postal_input) &&
      location_input.includes("emeryville") &&
      property_type.length != 0) ||
    (code_fremont.includes(postal_input) &&
      location_input.includes("fremont") &&
      property_type.length != 0) ||
    (code_gilroy.includes(postal_input) &&
      location_input.includes("gilroy") &&
      property_type.length != 0) ||
    (code_greenbrae.includes(postal_input) &&
      location_input.includes("greenbrae") &&
      property_type.length != 0) ||
    (code_half_moon_bay.includes(postal_input) &&
      location_input.includes("half moon bay") &&
      property_type.length != 0) ||
    (code_hayward.includes(postal_input) &&
      location_input.includes("hayward") &&
      property_type.length != 0) ||
    (code_hercules.includes(postal_input) &&
      location_input.includes("hercules") &&
      property_type.length != 0) ||
    (code_kentfield.includes(postal_input) &&
      location_input.includes("kentfield") &&
      property_type.length != 0) ||
    (code_lafayette.includes(postal_input) &&
      location_input.includes("lafayette") &&
      property_type.length != 0) ||
    (code_larkspur.includes(postal_input) &&
      location_input.includes("larkspur") &&
      property_type.length != 0) ||
    (code_livermore.includes(postal_input) &&
      location_input.includes("livermore") &&
      property_type.length != 0) ||
    (code_los_altos.includes(postal_input) &&
      location_input.includes("los altos") &&
      property_type.length != 0) ||
    (code_los_gatos.includes(postal_input) &&
      location_input.includes("los gatos") &&
      property_type.length != 0) ||
    (code_martinez.includes(postal_input) &&
      location_input.includes("martinez") &&
      property_type.length != 0) ||
    (code_menlo_park.includes(postal_input) &&
      location_input.includes("menlo park") &&
      property_type.length != 0) ||
    (code_mill_valley.includes(postal_input) &&
      location_input.includes("mill valley") &&
      property_type.length != 0) ||
    (code_millbrae.includes(postal_input) &&
      location_input.includes("millbrae") &&
      property_type.length != 0) ||
    (code_milpitas.includes(postal_input) &&
      location_input.includes("milpitas") &&
      property_type.length != 0) ||
    (code_montara.includes(postal_input) &&
      location_input.includes("montara") &&
      property_type.length != 0) ||
    (code_moraga.includes(postal_input) &&
      location_input.includes("moraga") &&
      property_type.length != 0) ||
    (code_morgan_hill.includes(postal_input) &&
      location_input.includes("morgan hill") &&
      property_type.length != 0) ||
    (code_moss_beach.includes(postal_input) &&
      location_input.includes("moss beach") &&
      property_type.length != 0) ||
    (code_mountain_view.includes(postal_input) &&
      location_input.includes("mountain view") &&
      property_type.length != 0) ||
    (code_newark.includes(postal_input) &&
      location_input.includes("newark") &&
      property_type.length != 0) ||
    (code_oakland.includes(postal_input) &&
      location_input.includes("oakland") &&
      property_type.length != 0) ||
    (code_orinda.includes(postal_input) &&
      location_input.includes("orinda") &&
      property_type.length != 0) ||
    (code_pacifica.includes(postal_input) &&
      location_input.includes("pacifica") &&
      property_type.length != 0) ||
    (code_palo_alto.includes(postal_input) &&
      location_input.includes("palo alto") &&
      property_type.length != 0) ||
    (code_piedmont.includes(postal_input) &&
      location_input.includes("piedmont") &&
      property_type.length != 0) ||
    (code_pinole.includes(postal_input) &&
      location_input.includes("pinole") &&
      property_type.length != 0) ||
    (code_pittsburg.includes(postal_input) &&
      location_input.includes("pittsburg") &&
      property_type.length != 0) ||
    (code_pleasant_hill.includes(postal_input) &&
      location_input.includes("pleasant hill") &&
      property_type.length != 0) ||
    (code_pleasanton.includes(postal_input) &&
      location_input.includes("pleasanton") &&
      property_type.length != 0) ||
    (code_port_costa.includes(postal_input) &&
      location_input.includes("port costa") &&
      property_type.length != 0) ||
    (code_redwood_city.includes(postal_input) &&
      location_input.includes("redwood") &&
      property_type.length != 0) ||
    (code_richmond.includes(postal_input) &&
      location_input.includes("richmond") &&
      property_type.length != 0) ||
    (code_rodeo.includes(postal_input) &&
      location_input.includes("rodeo") &&
      property_type.length != 0) ||
    (code_ross.includes(postal_input) &&
      location_input.includes("ross") &&
      property_type.length != 0) ||
    (code_san_anselmo.includes(postal_input) &&
      location_input.includes("san anselmo") &&
      property_type.length != 0) ||
    (code_san_bruno.includes(postal_input) &&
      location_input.includes("san bruno") &&
      property_type.length != 0) ||
    (code_san_carlos.includes(postal_input) &&
      location_input.includes("san carlos") &&
      property_type.length != 0) ||
    (code_san_francisco.includes(postal_input) &&
      location_input.includes("san francisco") &&
      property_type.length != 0) ||
    (code_san_jose.includes(postal_input) &&
      location_input.includes("san jose") &&
      property_type.length != 0) ||
    (code_san_leandro.includes(postal_input) &&
      location_input.includes("san leandro") &&
      property_type.length != 0) ||
    (code_lorenzo.includes(postal_input) &&
      location_input.includes("lorenzo") &&
      property_type.length != 0) ||
    (code_san_martin.includes(postal_input) &&
      location_input.includes("san martin") &&
      property_type.length != 0) ||
    (code_san_mateo.includes(postal_input) &&
      location_input.includes("san mateo") &&
      property_type.length != 0) ||
    (code_san_pablo.includes(postal_input) &&
      location_input.includes("san pablo") &&
      property_type.length != 0) ||
    (code_san_quentin.includes(postal_input) &&
      location_input.includes("san quentin") &&
      property_type.length != 0) ||
    (code_san_rafael.includes(postal_input) &&
      location_input.includes("san rafael") &&
      property_type.length != 0) ||
    (code_san_ramon.includes(postal_input) &&
      location_input.includes("san ramon") &&
      property_type.length != 0) ||
    (code_santa_clara.includes(postal_input) &&
      location_input.includes("santa clara") &&
      property_type.length != 0) ||
    (code_santa_cruz.includes(postal_input) &&
      location_input.includes("santa cruz") &&
      property_type.length != 0) ||
    (code_saratoga.includes(postal_input) &&
      location_input.includes("saratoga") &&
      property_type.length != 0) ||
    (code_sausalito.includes(postal_input) &&
      location_input.includes("sausalito") &&
      property_type.length != 0) ||
    (code_scotts_valley.includes(postal_input) &&
      location_input.includes("scotts valley") &&
      property_type.length != 0) ||
    (code_south_san_francisco.includes(postal_input) &&
      location_input.includes("south san francisco") &&
      property_type.length != 0) ||
    (code_stanford.includes(postal_input) &&
      location_input.includes("stanford") &&
      property_type.length != 0) ||
    (code_sunnyvale.includes(postal_input) &&
      location_input.includes("sunnyvale") &&
      property_type.length != 0) ||
    (code_sunol.includes(postal_input) &&
      location_input.includes("sunol") &&
      property_type.length != 0) ||
    (code_tracy.includes(postal_input) &&
      location_input.includes("tracy") &&
      property_type.length != 0) ||
    (code_union_city.includes(postal_input) &&
      location_input.includes("union city") &&
      property_type.length != 0) ||
    (code_vallejo.includes(postal_input) &&
      location_input.includes("vallejo") &&
      property_type.length != 0) ||
    (code_walnut_creek.includes(postal_input) &&
      location_input.includes("walnut creek") &&
      property_type.length != 0) ||
    (code_bonita.includes(postal_input) &&
      location_input.includes("bonita") &&
      property_type.length != 0) ||
    (code_bonsall.includes(postal_input) &&
      location_input.includes("bonsall") &&
      property_type.length != 0) ||
    (code_cardiff_by_the_sea.includes(postal_input) &&
      location_input.includes("cardiff") &&
      property_type.length != 0) ||
    (code_cardiff_by_the_sea.includes(postal_input) &&
      location_input.includes("cardiff-by-the-sea") &&
      property_type.length != 0) ||
    (code_carlsbad.includes(postal_input) &&
      location_input.includes("carlsbad") &&
      property_type.length != 0) ||
    (code_chula_vista.includes(postal_input) &&
      location_input.includes("chula vista") &&
      property_type.length != 0) ||
    (code_coronado.includes(postal_input) &&
      location_input.includes("coronado") &&
      property_type.length != 0) ||
    (code_del_mar.includes(postal_input) &&
      location_input.includes("del mar") &&
      property_type.length != 0) ||
    (code_el_cajon.includes(postal_input) &&
      location_input.includes("el cajon") &&
      property_type.length != 0) ||
    (code_encinitas.includes(postal_input) &&
      location_input.includes("encinitas") &&
      property_type.length != 0) ||
    (code_escondido.includes(postal_input) &&
      location_input.includes("escondido") &&
      property_type.length != 0) ||
    (code_fallbrook.includes(postal_input) &&
      location_input.includes("fallbrook") &&
      property_type.length != 0) ||
    (code_imperial_beach.includes(postal_input) &&
      location_input.includes("imperial beach") &&
      property_type.length != 0) ||
    (code_la_jolla.includes(postal_input) &&
      location_input.includes("la jolla") &&
      property_type.length != 0) ||
    (code_la_mesa.includes(postal_input) &&
      location_input.includes("la mesa") &&
      property_type.length != 0) ||
    (code_lemon_grove.includes(postal_input) &&
      location_input.includes("lemon grove") &&
      property_type.length != 0) ||
    (code_national_city.includes(postal_input) &&
      location_input.includes("national") &&
      property_type.length != 0) ||
    (code_oceanside.includes(postal_input) &&
      location_input.includes("oceanside") &&
      property_type.length != 0) ||
    (code_poway.includes(postal_input) &&
      location_input.includes("poway") &&
      property_type.length != 0) ||
    (code_rancho_santa_fe.includes(postal_input) &&
      location_input.includes("rancho santa fe") &&
      property_type.length != 0) ||
    (code_san_diego.includes(postal_input) &&
      location_input.includes("san diego") &&
      property_type.length != 0) ||
    (code_san_luis_rey.includes(postal_input) &&
      location_input.includes("san luis rey") &&
      property_type.length != 0) ||
    (code_san_marcos.includes(postal_input) &&
      location_input.includes("san marcos") &&
      property_type.length != 0) ||
    (code_san_ysidro.includes(postal_input) &&
      location_input.includes("san ysidro") &&
      property_type.length != 0) ||
    (code_santee.includes(postal_input) &&
      location_input.includes("santee") &&
      property_type.length != 0) ||
    (code_solana_beach.includes(postal_input) &&
      location_input.includes("solana beach") &&
      property_type.length != 0) ||
    (code_spring_valley.includes(postal_input) &&
      location_input.includes("spring valley") &&
      property_type.length != 0) ||
    (code_vista.includes(postal_input) &&
      location_input.includes("vista") &&
      property_type.length != 0) ||
    (code_aliso_viejo.includes(postal_input) &&
      location_input.includes("aliso viejo") &&
      property_type.length != 0) ||
    (code_bloomington.includes(postal_input) &&
      location_input.includes("bloomington") &&
      property_type.length != 0) ||
    (code_bryn_mawr.includes(postal_input) &&
      location_input.includes("bryn mawr") &&
      property_type.length != 0) ||
    (code_buena_park.includes(postal_input) &&
      location_input.includes("buena park") &&
      property_type.length != 0) ||
    (code_capistrano_beach.includes(postal_input) &&
      location_input.includes("capistrano beach") &&
      property_type.length != 0) ||
    (code_chino.includes(postal_input) &&
      location_input.includes("chino") &&
      property_type.length != 0) ||
    (code_claremont.includes(postal_input) &&
      location_input.includes("claremont") &&
      property_type.length != 0) ||
    (code_colton.includes(postal_input) &&
      location_input.includes("colton") &&
      property_type.length != 0) ||
    (code_corona.includes(postal_input) &&
      location_input.includes("corona") &&
      property_type.length != 0) ||
    (code_dana_point.includes(postal_input) &&
      location_input.includes("dana point") &&
      property_type.length != 0) ||
    (code_el_toro.includes(postal_input) &&
      location_input.includes("el toro") &&
      property_type.length != 0) ||
    (code_fontana.includes(postal_input) &&
      location_input.includes("fontana") &&
      property_type.length != 0) ||
    (code_grand_terrace.includes(postal_input) &&
      location_input.includes("grand terrace") &&
      property_type.length != 0) ||
    (code_guasti.includes(postal_input) &&
      location_input.includes("guasti") &&
      property_type.length != 0) ||
    (code_highland.includes(postal_input) &&
      location_input.includes("highland") &&
      property_type.length != 0) ||
    (code_irvine.includes(postal_input) &&
      location_input.includes("irvine") &&
      property_type.length != 0) ||
    (code_ladera_ranch.includes(postal_input) &&
      location_input.includes("ladera ranch") &&
      property_type.length != 0) ||
    (code_laguna_beach.includes(postal_input) &&
      location_input.includes("laguna beach") &&
      property_type.length != 0) ||
    (code_laguna_hills.includes(postal_input) &&
      location_input.includes("laguna hills") &&
      property_type.length != 0) ||
    (code_laguna_niguel.includes(postal_input) &&
      location_input.includes("laguna niguel") &&
      property_type.length != 0) ||
    (code_laguna_woods.includes(postal_input) &&
      location_input.includes("laguna woods") &&
      property_type.length != 0) ||
    (code_lake_forest.includes(postal_input) &&
      location_input.includes("lake forest") &&
      property_type.length != 0) ||
    (code_loma_linda.includes(postal_input) &&
      location_input.includes("loma linda") &&
      property_type.length != 0) ||
    (code_march_air_reserve_base.includes(postal_input) &&
      location_input.includes("march air reserve") &&
      property_type.length != 0) ||
    (code_mira_loma.includes(postal_input) &&
      location_input.includes("mira loma") &&
      property_type.length != 0) ||
    (code_mission_viejo.includes(postal_input) &&
      location_input.includes("mission viejo") &&
      property_type.length != 0) ||
    (code_montclair.includes(postal_input) &&
      location_input.includes("montclair") &&
      property_type.length != 0) ||
    (code_moreno_valley.includes(postal_input) &&
      location_input.includes("moreno valley") &&
      property_type.length != 0) ||
    (code_norco.includes(postal_input) &&
      location_input.includes("norco") &&
      property_type.length != 0) ||
    (code_ontario.includes(postal_input) &&
      location_input.includes("ontario") &&
      property_type.length != 0) ||
    (code_patton.includes(postal_input) &&
      location_input.includes("patton") &&
      property_type.length != 0) ||
    (code_perris.includes(postal_input) &&
      location_input.includes("perris") &&
      property_type.length != 0) ||
    (code_pomona.includes(postal_input) &&
      location_input.includes("pomona") &&
      property_type.length != 0) ||
    (code_ranco_cucamonga.includes(postal_input) &&
      location_input.includes("rancho cucamonga") &&
      property_type.length != 0) ||
    (code_rancho_santa_margarita.includes(postal_input) &&
      location_input.includes("rancho santa margarita") &&
      property_type.length != 0) ||
    (code_redlands.includes(postal_input) &&
      location_input.includes("redlands") &&
      property_type.length != 0) ||
    (code_rialto.includes(postal_input) &&
      location_input.includes("rialto") &&
      property_type.length != 0) ||
    (code_riverside.includes(postal_input) &&
      location_input.includes("riverside") &&
      property_type.length != 0) ||
    (code_san_bernardino.includes(postal_input) &&
      location_input.includes("san bernardino") &&
      property_type.length != 0) ||
    (code_san_clemente.includes(postal_input) &&
      location_input.includes("san clemente") &&
      property_type.length != 0) ||
    (code_san_dimas.includes(postal_input) &&
      location_input.includes("san dimas") &&
      property_type.length != 0) ||
    (code_san_juan_capistrano.includes(postal_input) &&
      location_input.includes("san juan capistrano") &&
      property_type.length != 0) ||
    (code_upland.includes(postal_input) &&
      location_input.includes("upland") &&
      property_type.length != 0) ||
    (code_arvada.includes(postal_input) &&
      location_input.includes("arvada") &&
      property_type.length != 0) ||
    (code_aurora.includes(postal_input) &&
      location_input.includes("aurora") &&
      property_type.length != 0) ||
    (code_boulder.includes(postal_input) &&
      location_input.includes("boulder") &&
      property_type.length != 0) ||
    (code_brighton.includes(postal_input) &&
      location_input.includes("brighton") &&
      property_type.length != 0) ||
    (code_broomfield.includes(postal_input) &&
      location_input.includes("broomfield") &&
      property_type.length != 0) ||
    (code_commerce_city.includes(postal_input) &&
      location_input.includes("commerce city") &&
      property_type.length != 0) ||
    (code_denver.includes(postal_input) &&
      location_input.includes("denver") &&
      property_type.length != 0) ||
    (code_dupont.includes(postal_input) &&
      location_input.includes("dupont") &&
      property_type.length != 0) ||
    (code_eastlake.includes(postal_input) &&
      location_input.includes("eastlake") &&
      property_type.length != 0) ||
    (code_englewood.includes(postal_input) &&
      location_input.includes("englewood") &&
      property_type.length != 0) ||
    (code_henderson.includes(postal_input) &&
      location_input.includes("henderson") &&
      property_type.length != 0) ||
    (code_littleton.includes(postal_input) &&
      location_input.includes("littleton") &&
      property_type.length != 0) ||
    (code_westminster.includes(postal_input) &&
      location_input.includes("westminster") &&
      property_type.length != 0) ||
    (code_blue_diamond.includes(postal_input) &&
      location_input.includes("blue diamond") &&
      property_type.length != 0) ||
    (code_boulder_city.includes(postal_input) &&
      location_input.includes("boulder") &&
      property_type.length != 0) ||
    (code_bunkerville.includes(postal_input) &&
      location_input.includes("bunkerville") &&
      property_type.length != 0) ||
    (code_cal_nev_ari.includes(postal_input) &&
      location_input.includes("cal nev ari") &&
      property_type.length != 0) ||
    (code_coyote_springs.includes(postal_input) &&
      location_input.includes("coyote springs") &&
      property_type.length != 0) ||
    (code_henderson.includes(postal_input) &&
      location_input.includes("henderson") &&
      property_type.length != 0) ||
    (code_indian_springs.includes(postal_input) &&
      location_input.includes("indian springs") &&
      property_type.length != 0) ||
    (code_jean.includes(postal_input) &&
      location_input.includes("jean") &&
      property_type.length != 0) ||
    (code_las_vegas.includes(postal_input) &&
      location_input.includes("las vegas") &&
      property_type.length != 0) ||
    (code_laughlin.includes(postal_input) &&
      location_input.includes("laughlin") &&
      property_type.length != 0) ||
    (code_logandale.includes(postal_input) &&
      location_input.includes("logandale") &&
      property_type.length != 0) ||
    (code_mesquite.includes(postal_input) &&
      location_input.includes("mesquite") &&
      property_type.length != 0) ||
    (code_moapa.includes(postal_input) &&
      location_input.includes("moapa") &&
      property_type.length != 0) ||
    (code_nellis_afb.includes(postal_input) &&
      location_input.includes("nellis afb") &&
      property_type.length != 0) ||
    (code_nellis_afb.includes(postal_input) &&
      location_input.includes("nellis air force base") &&
      property_type.length != 0) ||
    (code_north_las_vegas.includes(postal_input) &&
      location_input.includes("north las vegas") &&
      property_type.length != 0) ||
    (code_overton.includes(postal_input) &&
      location_input.includes("overton") &&
      property_type.length != 0) ||
    (code_searchlight.includes(postal_input) &&
      location_input.includes("searchlight") &&
      property_type.length != 0) ||
    (code_sloan.includes(postal_input) &&
      location_input.includes("sloan") &&
      property_type.length != 0) ||
    (code_the_lakes.includes(postal_input) &&
      location_input.includes("the lakes") &&
      property_type.length != 0) ||
    (code_accokeek.includes(postal_input) &&
      location_input.includes("accokeek") &&
      property_type.length != 0) ||
    (code_andrews_air_force_base.includes(postal_input) &&
      location_input.includes("andrews air force base") &&
      property_type.length != 0) ||
    (code_andrews_air_force_base.includes(postal_input) &&
      location_input.includes("andrews afb") &&
      property_type.length != 0) ||
    (code_annapolis.includes(postal_input) &&
      location_input.includes("annapolis") &&
      property_type.length != 0) ||
    (code_annapolis_junction.includes(postal_input) &&
      location_input.includes("annapolis junction") &&
      property_type.length != 0) ||
    (code_aquasco.includes(postal_input) &&
      location_input.includes("aquasco") &&
      property_type.length != 0) ||
    (code_arnold.includes(postal_input) &&
      location_input.includes("arnold") &&
      property_type.length != 0) ||
    (code_ashton.includes(postal_input) &&
      location_input.includes("ashton") &&
      property_type.length != 0) ||
    (code_baltimore.includes(postal_input) &&
      location_input.includes("baltimore") &&
      property_type.length != 0) ||
    (code_barnesville.includes(postal_input) &&
      location_input.includes("barnesville") &&
      property_type.length != 0) ||
    (code_beallsville.includes(postal_input) &&
      location_input.includes("beallsville") &&
      property_type.length != 0) ||
    (code_beltsville.includes(postal_input) &&
      location_input.includes("beltsville") &&
      property_type.length != 0) ||
    (code_bethesda.includes(postal_input) &&
      location_input.includes("bethesda") &&
      property_type.length != 0) ||
    (code_bladensburg.includes(postal_input) &&
      location_input.includes("bladensburg") &&
      property_type.length != 0) ||
    (code_bowie.includes(postal_input) &&
      location_input.includes("bowie") &&
      property_type.length != 0) ||
    (code_boyds.includes(postal_input) &&
      location_input.includes("boyds") &&
      property_type.length != 0) ||
    (code_brandywine.includes(postal_input) &&
      location_input.includes("brandywine") &&
      property_type.length != 0) ||
    (code_brentwood.includes(postal_input) &&
      location_input.includes("brentwood") &&
      property_type.length != 0) ||
    (code_brinklow.includes(postal_input) &&
      location_input.includes("brinklow") &&
      property_type.length != 0) ||
    (code_brookeville.includes(postal_input) &&
      location_input.includes("brookeville") &&
      property_type.length != 0) ||
    (code_burtonsville.includes(postal_input) &&
      location_input.includes("burtonsville") &&
      property_type.length != 0) ||
    (code_cabin_john.includes(postal_input) &&
      location_input.includes("cabin john") &&
      property_type.length != 0) ||
    (code_capitol_heights.includes(postal_input) &&
      location_input.includes("capitol heights") &&
      property_type.length != 0) ||
    (code_cheltenham.includes(postal_input) &&
      location_input.includes("cheltenham") &&
      property_type.length != 0) ||
    (code_chevy_chase.includes(postal_input) &&
      location_input.includes("chevy chase") &&
      property_type.length != 0) ||
    (code_churchton.includes(postal_input) &&
      location_input.includes("churchton") &&
      property_type.length != 0) ||
    (code_clarksburg.includes(postal_input) &&
      location_input.includes("clarksburg") &&
      property_type.length != 0) ||
    (code_clarksville.includes(postal_input) &&
      location_input.includes("clarksville") &&
      property_type.length != 0) ||
    (code_clinton.includes(postal_input) &&
      location_input.includes("clinton") &&
      property_type.length != 0) ||
    (code_college_park.includes(postal_input) &&
      location_input.includes("college park") &&
      property_type.length != 0) ||
    (code_columbia.includes(postal_input) &&
      location_input.includes("columbia") &&
      property_type.length != 0) ||
    (code_cooksville.includes(postal_input) &&
      location_input.includes("cooksville") &&
      property_type.length != 0) ||
    (code_crofton.includes(postal_input) &&
      location_input.includes("crofton") &&
      property_type.length != 0) ||
    (code_crownsville.includes(postal_input) &&
      location_input.includes("crownsville") &&
      property_type.length != 0) ||
    (code_curtis_bay.includes(postal_input) &&
      location_input.includes("curtis bay") &&
      property_type.length != 0) ||
    (code_damascus.includes(postal_input) &&
      location_input.includes("damascus") &&
      property_type.length != 0) ||
    (code_davidsonville.includes(postal_input) &&
      location_input.includes("davidsonville") &&
      property_type.length != 0) ||
    (code_dayton.includes(postal_input) &&
      location_input.includes("dayton") &&
      property_type.length != 0) ||
    (code_deale.includes(postal_input) &&
      location_input.includes("deale") &&
      property_type.length != 0) ||
    (code_derwood.includes(postal_input) &&
      location_input.includes("derwood") &&
      property_type.length != 0) ||
    (code_dickerson.includes(postal_input) &&
      location_input.includes("dickerson") &&
      property_type.length != 0) ||
    (code_district_heights.includes(postal_input) &&
      location_input.includes("district heights") &&
      property_type.length != 0) ||
    (code_edgewater.includes(postal_input) &&
      location_input.includes("edgewater") &&
      property_type.length != 0) ||
    (code_elkridge.includes(postal_input) &&
      location_input.includes("elkridge") &&
      property_type.length != 0) ||
    (code_ellicott_city.includes(postal_input) &&
      location_input.includes("ellicott") &&
      property_type.length != 0) ||
    (code_fort_george.includes(postal_input) &&
      location_input.includes("fort george") &&
      property_type.length != 0) ||
    (code_fort_washington.includes(postal_input) &&
      location_input.includes("fort washington") &&
      property_type.length != 0) ||
    (code_friendship.includes(postal_input) &&
      location_input.includes("friendship") &&
      property_type.length != 0) ||
    (code_fulton.includes(postal_input) &&
      location_input.includes("fulton") &&
      property_type.length != 0) ||
    (code_gaithersburg.includes(postal_input) &&
      location_input.includes("gaithersburg") &&
      property_type.length != 0) ||
    (code_galesville.includes(postal_input) &&
      location_input.includes("galesville") &&
      property_type.length != 0) ||
    (code_gambrills.includes(postal_input) &&
      location_input.includes("gambrills") &&
      property_type.length != 0) ||
    (code_garrett_park.includes(postal_input) &&
      location_input.includes("garrett park") &&
      property_type.length != 0) ||
    (code_germantown.includes(postal_input) &&
      location_input.includes("germantown") &&
      property_type.length != 0) ||
    (code_gibson_island.includes(postal_input) &&
      location_input.includes("gibson island") &&
      property_type.length != 0) ||
    (code_glen_burnie.includes(postal_input) &&
      location_input.includes("glen burnie") &&
      property_type.length != 0) ||
    (code_glen_echo.includes(postal_input) &&
      location_input.includes("glen echo") &&
      property_type.length != 0) ||
    (code_glenelg.includes(postal_input) &&
      location_input.includes("glenelg") &&
      property_type.length != 0) ||
    (code_glenn_dale.includes(postal_input) &&
      location_input.includes("glenn dale") &&
      property_type.length != 0) ||
    (code_glenwood.includes(postal_input) &&
      location_input.includes("glenwood") &&
      property_type.length != 0) ||
    (code_greenbelt.includes(postal_input) &&
      location_input.includes("greenbelt") &&
      property_type.length != 0) ||
    (code_hanover.includes(postal_input) &&
      location_input.includes("hanover") &&
      property_type.length != 0) ||
    (code_harmans.includes(postal_input) &&
      location_input.includes("harmans") &&
      property_type.length != 0) ||
    (code_harwood.includes(postal_input) &&
      location_input.includes("harwood") &&
      property_type.length != 0) ||
    (code_highland.includes(postal_input) &&
      location_input.includes("highland") &&
      property_type.length != 0) ||
    (code_hyattsville.includes(postal_input) &&
      location_input.includes("hyattsville") &&
      property_type.length != 0) ||
    (code_jessup.includes(postal_input) &&
      location_input.includes("jessup") &&
      property_type.length != 0) ||
    (code_kensington.includes(postal_input) &&
      location_input.includes("kensington") &&
      property_type.length != 0) ||
    (code_lanham.includes(postal_input) &&
      location_input.includes("lanham") &&
      property_type.length != 0) ||
    (code_laurel.includes(postal_input) &&
      location_input.includes("laurel") &&
      property_type.length != 0) ||
    (code_linthicum_heights.includes(postal_input) &&
      location_input.includes("linthicum heights") &&
      property_type.length != 0) ||
    (code_lisbon.includes(postal_input) &&
      location_input.includes("lisbon") &&
      property_type.length != 0) ||
    (code_mayo.includes(postal_input) &&
      location_input.includes("mayo") &&
      property_type.length != 0) ||
    (code_millersville.includes(postal_input) &&
      location_input.includes("millersville") &&
      property_type.length != 0) ||
    (code_montgomery_village.includes(postal_input) &&
      location_input.includes("montgomery village") &&
      property_type.length != 0) ||
    (code_mount_rainier.includes(postal_input) &&
      location_input.includes("mount rainier") &&
      property_type.length != 0) ||
    (code_odenton.includes(postal_input) &&
      location_input.includes("odenton") &&
      property_type.length != 0) ||
    (code_olney.includes(postal_input) &&
      location_input.includes("olney") &&
      property_type.length != 0) ||
    (code_oxon_hill.includes(postal_input) &&
      location_input.includes("oxon hill") &&
      property_type.length != 0) ||
    (code_poolesville.includes(postal_input) &&
      location_input.includes("poolesville") &&
      property_type.length != 0) ||
    (code_potomac.includes(postal_input) &&
      location_input.includes("potomac") &&
      property_type.length != 0) ||
    (code_riva.includes(postal_input) &&
      location_input.includes("riva") &&
      property_type.length != 0) ||
    (code_riverdale.includes(postal_input) &&
      location_input.includes("riverdale") &&
      property_type.length != 0) ||
    (code_rockville.includes(postal_input) &&
      location_input.includes("rockville") &&
      property_type.length != 0) ||
    (code_sandy_spring.includes(postal_input) &&
      location_input.includes("sandy spring") &&
      property_type.length != 0) ||
    (code_savage.includes(postal_input) &&
      location_input.includes("savage") &&
      property_type.length != 0) ||
    (code_severn.includes(postal_input) &&
      location_input.includes("severn") &&
      property_type.length != 0) ||
    (code_severna_park.includes(postal_input) &&
      location_input.includes("severna park") &&
      property_type.length != 0) ||
    (code_shady_side.includes(postal_input) &&
      location_input.includes("shady side") &&
      property_type.length != 0) ||
    (code_silver_spring.includes(postal_input) &&
      location_input.includes("silver spring") &&
      property_type.length != 0) ||
    (code_simpsonville.includes(postal_input) &&
      location_input.includes("simpsonville") &&
      property_type.length != 0) ||
    (code_spencerville.includes(postal_input) &&
      location_input.includes("spencerville") &&
      property_type.length != 0) ||
    (code_suitland.includes(postal_input) &&
      location_input.includes("suitland") &&
      property_type.length != 0) ||
    (code_takoma_park.includes(postal_input) &&
      location_input.includes("takoma park") &&
      property_type.length != 0) ||
    (code_temple_hills.includes(postal_input) &&
      location_input.includes("temple hills") &&
      property_type.length != 0) ||
    (code_tracys_landing.includes(postal_input) &&
      location_input.includes("tracys landing") &&
      property_type.length != 0) ||
    (code_upper_marlboro.includes(postal_input) &&
      location_input.includes("upper marlboro") &&
      property_type.length != 0) ||
    (code_washington_grove.includes(postal_input) &&
      location_input.includes("washington grove") &&
      property_type.length != 0) ||
    (code_west_friendship.includes(postal_input) &&
      location_input.includes("west friendship") &&
      property_type.length != 0) ||
    (code_west_river.includes(postal_input) &&
      location_input.includes("west river") &&
      property_type.length != 0) ||
    (code_woodbine.includes(postal_input) &&
      location_input.includes("woodbine") &&
      property_type.length != 0) ||
    (code_woodstock.includes(postal_input) &&
      location_input.includes("woodstock") &&
      property_type.length != 0)
  ) {
    // if user input has poplar services' postal code && poplar location display modal_serviced
    modal_serviced.style.display = "block";
  }
  // second statement for subsidiary services
  else if (
    // RAVE
    (code_austin.includes(postal_input) &&
      location_input.includes("austin") &&
      property_type.length != 0) ||
    (code_bastrop.includes(postal_input) &&
      location_input.includes("bastrop") &&
      property_type.length != 0) ||
    (code_buda.includes(postal_input) &&
      location_input.includes("buda") &&
      property_type.length != 0) ||
    (code_cedar_creek.includes(postal_input) &&
      location_input.includes("cedar creek") &&
      property_type.length != 0) ||
    (code_cedar_park.includes(postal_input) &&
      location_input.includes("cedar park") &&
      property_type.length != 0) ||
    (code_corpus_christi.includes(postal_input) &&
      location_input.includes("corpus christi") &&
      property_type.length != 0) ||
    (code_coupland.includes(postal_input) &&
      location_input.includes("coupland") &&
      property_type.length != 0) ||
    (code_del_valle.includes(postal_input) &&
      location_input.includes("del valle") &&
      property_type.length != 0) ||
    (code_dripping_srpings.includes(postal_input) &&
      location_input.includes("dripping springs") &&
      property_type.length != 0) ||
    (code_elgin.includes(postal_input) &&
      location_input.includes("elgin") &&
      property_type.length != 0) ||
    (code_florence.includes(postal_input) &&
      location_input.includes("florence") &&
      property_type.length != 0) ||
    (code_georgetown.includes(postal_input) &&
      location_input.includes("georgetown") &&
      property_type.length != 0) ||
    (code_harker_heights.includes(postal_input) &&
      location_input.includes("harker heights") &&
      property_type.length != 0) ||
    (code_hutto.includes(postal_input) &&
      location_input.includes("hutto") &&
      property_type.length != 0) ||
    (code_jarrell.includes(postal_input) &&
      location_input.includes("jarrell") &&
      property_type.length != 0) ||
    (code_killeen.includes(postal_input) &&
      location_input.includes("killeen") &&
      property_type.length != 0) ||
    (code_kyle.includes(postal_input) &&
      location_input.includes("kyle") &&
      property_type.length != 0) ||
    (code_leander.includes(postal_input) &&
      location_input.includes("leander") &&
      property_type.length != 0) ||
    (code_liberty_hill.includes(postal_input) &&
      location_input.includes("liberty hill") &&
      property_type.length != 0) ||
    (code_manchaca.includes(postal_input) &&
      location_input.includes("manchaca") &&
      property_type.length != 0) ||
    (code_manor.includes(postal_input) &&
      location_input.includes("manor") &&
      property_type.length != 0) ||
    (code_pflugerville.includes(postal_input) &&
      location_input.includes("pflugerville") &&
      property_type.length != 0) ||
    (code_roundrock.includes(postal_input) &&
      location_input.includes("round rock") &&
      property_type.length != 0) ||
    (code_salado.includes(postal_input) &&
      location_input.includes("salado") &&
      property_type.length != 0) ||
    (code_taylor.includes(postal_input) &&
      location_input.includes("taylor") &&
      property_type.length != 0) ||
    (code_temple.includes(postal_input) &&
      location_input.includes("temple") &&
      property_type.length != 0) ||
    // COMPLETE
    (code_alief.includes(postal_input) &&
      location_input.includes("alief") &&
      property_type.length != 0) ||
    (code_alvin.includes(postal_input) &&
      location_input.includes("alvin") &&
      property_type.length != 0) ||
    (code_angleton.includes(postal_input) &&
      location_input.includes("angleton") &&
      property_type.length != 0) ||
    (code_bacliff.includes(postal_input) &&
      location_input.includes("bacliff") &&
      property_type.length != 0) ||
    (code_barker.includes(postal_input) &&
      location_input.includes("barker") &&
      property_type.length != 0) ||
    (code_baytown.includes(postal_input) &&
      location_input.includes("baytown") &&
      property_type.length != 0) ||
    (code_bellaire.includes(postal_input) &&
      location_input.includes("bellaire") &&
      property_type.length != 0) ||
    (code_channelview.includes(postal_input) &&
      location_input.includes("channelview") &&
      property_type.length != 0) ||
    (code_conroe.includes(postal_input) &&
      location_input.includes("conroe") &&
      property_type.length != 0) ||
    (code_crosby.includes(postal_input) &&
      location_input.includes("crosby") &&
      property_type.length != 0) ||
    (code_cypress.includes(postal_input) &&
      location_input.includes("cypress") &&
      property_type.length != 0) ||
    (code_deer_park.includes(postal_input) &&
      location_input.includes("deer park") &&
      property_type.length != 0) ||
    (code_dickinson.includes(postal_input) &&
      location_input.includes("dickinson") &&
      property_type.length != 0) ||
    (code_freeport.includes(postal_input) &&
      location_input.includes("freeport") &&
      property_type.length != 0) ||
    (code_fresno.includes(postal_input) &&
      location_input.includes("fresno") &&
      property_type.length != 0) ||
    (code_friendswood.includes(postal_input) &&
      location_input.includes("friendswood") &&
      property_type.length != 0) ||
    (code_gelena_park.includes(postal_input) &&
      location_input.includes("gelena park") &&
      property_type.length != 0) ||
    (code_hempstead.includes(postal_input) &&
      location_input.includes("hempstead") &&
      property_type.length != 0) ||
    (code_highlands.includes(postal_input) &&
      location_input.includes("highlands") &&
      property_type.length != 0) ||
    (code_hitchcock.includes(postal_input) &&
      location_input.includes("hitchcock") &&
      property_type.length != 0) ||
    (code_houston.includes(postal_input) &&
      location_input.includes("houston") &&
      property_type.length != 0) ||
    (code_huffman.includes(postal_input) &&
      location_input.includes("huffman") &&
      property_type.length != 0) ||
    (code_humble.includes(postal_input) &&
      location_input.includes("humble") &&
      property_type.length != 0) ||
    (code_katy.includes(postal_input) &&
      location_input.includes("katy") &&
      property_type.length != 0) ||
    (code_kemah.includes(postal_input) &&
      location_input.includes("kemah") &&
      property_type.length != 0) ||
    (code_kingwood.includes(postal_input) &&
      location_input.includes("kingwood") &&
      property_type.length != 0) ||
    (code_la_marque.includes(postal_input) &&
      location_input.includes("la marque") &&
      property_type.length != 0) ||
    (code_la_porte.includes(postal_input) &&
      location_input.includes("la porte") &&
      property_type.length != 0) ||
    (code_league_city.includes(postal_input) &&
      location_input.includes("league city") &&
      property_type.length != 0) ||
    (code_liverpool.includes(postal_input) &&
      location_input.includes("liverpool") &&
      property_type.length != 0) ||
    (code_manvel.includes(postal_input) &&
      location_input.includes("manvel") &&
      property_type.length != 0) ||
    (code_missouri_city.includes(postal_input) &&
      location_input.includes("missouri") &&
      property_type.length != 0) ||
    (code_north_houston.includes(postal_input) &&
      location_input.includes("north houston") &&
      property_type.length != 0) ||
    (code_pearland.includes(postal_input) &&
      location_input.includes("pearland") &&
      property_type.length != 0) ||
    (code_porter.includes(postal_input) &&
      location_input.includes("porter") &&
      property_type.length != 0) ||
    (code_rosenberg.includes(postal_input) &&
      location_input.includes("rosenberg") &&
      property_type.length != 0) ||
    (code_rosharon.includes(postal_input) &&
      location_input.includes("rosharon") &&
      property_type.length != 0) ||
    (code_santa_fe.includes(postal_input) &&
      location_input.includes("santa fe") &&
      property_type.length != 0) ||
    (code_seabrook.includes(postal_input) &&
      location_input.includes("seabrook") &&
      property_type.length != 0) ||
    (code_south_houston.includes(postal_input) &&
      location_input.includes("south houston") &&
      property_type.length != 0) ||
    (code_spring.includes(postal_input) &&
      location_input.includes("spring") &&
      property_type.length != 0) ||
    (code_stafford.includes(postal_input) &&
      location_input.includes("stafford") &&
      property_type.length != 0) ||
    (code_sugar_land.includes(postal_input) &&
      location_input.includes("sugar land") &&
      property_type.length != 0) ||
    (code_texas_city.includes(postal_input) &&
      location_input.includes("texas") &&
      property_type.length != 0) ||
    (code_thompsons.includes(postal_input) &&
      location_input.includes("thompsons") &&
      property_type.length != 0) ||
    (code_tomball.includes(postal_input) &&
      location_input.includes("tomball") &&
      property_type.length != 0) ||
    (code_waller.includes(postal_input) &&
      location_input.includes("waller") &&
      property_type.length != 0) ||
    (code_webster.includes(postal_input) &&
      location_input.includes("webster") &&
      property_type.length != 0) ||
    (code_west_columbia.includes(postal_input) &&
      location_input.includes("west columbia") &&
      property_type.length != 0) ||
    // CREEKBEND
    (code_charleston.includes(postal_input) &&
      location_input.includes("charleston") &&
      property_type.length != 0) ||
    (code_folly_beach.includes(postal_input) &&
      location_input.includes("folly beach") &&
      property_type.length != 0) ||
    (code_goose_creek.includes(postal_input) &&
      location_input.includes("goose creek") &&
      property_type.length != 0) ||
    (code_hanahan.includes(postal_input) &&
      location_input.includes("hanahan") &&
      property_type.length != 0) ||
    (code_isle_of_palms.includes(postal_input) &&
      location_input.includes("isle of palms") &&
      property_type.length != 0) ||
    (code_isle_of_palms.includes(postal_input) &&
      location_input.includes("palms isle") &&
      property_type.length != 0) ||
    (code_johns_island.includes(postal_input) &&
      location_input.includes("johns island") &&
      property_type.length != 0) ||
    (code_ladson.includes(postal_input) &&
      location_input.includes("ladson") &&
      property_type.length != 0) ||
    (code_moncks_corner.includes(postal_input) &&
      location_input.includes("moncks corner") &&
      property_type.length != 0) ||
    (code_mount_pleasant.includes(postal_input) &&
      location_input.includes("mount pleasant") &&
      property_type.length != 0) ||
    (code_mount_pleasant.includes(postal_input) &&
      location_input.includes("mt. pleasant") &&
      property_type.length != 0) ||
    (code_north_charleston.includes(postal_input) &&
      location_input.includes("north charleston") &&
      property_type.length != 0) ||
    (code_sullivan_island.includes(postal_input) &&
      location_input.includes("sullivans island") &&
      property_type.length != 0) ||
    (code_summerville.includes(postal_input) &&
      location_input.includes("summerville") &&
      property_type.length != 0) ||
    // RADIUS
    (code_annada.includes(postal_input) &&
      location_input.includes("annada") &&
      property_type.length != 0) ||
    (code_augusta.includes(postal_input) &&
      location_input.includes("augusta") &&
      property_type.length != 0) ||
    (code_ballwin.includes(postal_input) &&
      location_input.includes("ballwin") &&
      property_type.length != 0) ||
    (code_barnhart.includes(postal_input) &&
      location_input.includes("barnhart") &&
      property_type.length != 0) ||
    (code_beaufort.includes(postal_input) &&
      location_input.includes("beaufort") &&
      property_type.length != 0) ||
    (code_bridgeton.includes(postal_input) &&
      location_input.includes("bridgeton") &&
      property_type.length != 0) ||
    (code_catawissa.includes(postal_input) &&
      location_input.includes("catawissa") &&
      property_type.length != 0) ||
    (code_cedar_hill.includes(postal_input) &&
      location_input.includes("cedar hill") &&
      property_type.length != 0) ||
    (code_chesterfield.includes(postal_input) &&
      location_input.includes("chesterfield") &&
      property_type.length != 0) ||
    (code_crystal_city.includes(postal_input) &&
      location_input.includes("crystal") &&
      property_type.length != 0) ||
    (code_de_soto.includes(postal_input) &&
      location_input.includes("de soto") &&
      property_type.length != 0) ||
    (code_defiance.includes(postal_input) &&
      location_input.includes("defiance") &&
      property_type.length != 0) ||
    (code_dittmer.includes(postal_input) &&
      location_input.includes("dittmer") &&
      property_type.length != 0) ||
    (code_dutzow.includes(postal_input) &&
      location_input.includes("dutzow") &&
      property_type.length != 0) ||
    (code_earth_city.includes(postal_input) &&
      location_input.includes("earth city") &&
      property_type.length != 0) ||
    (code_elsberry.includes(postal_input) &&
      location_input.includes("elsberry") &&
      property_type.length != 0) ||
    (code_eolia.includes(postal_input) &&
      location_input.includes("eolia") &&
      property_type.length != 0) ||
    (code_eureka.includes(postal_input) &&
      location_input.includes("eureka") &&
      property_type.length != 0) ||
    (code_fenton.includes(postal_input) &&
      location_input.includes("fenton") &&
      property_type.length != 0) ||
    (code_festus.includes(postal_input) &&
      location_input.includes("festus") &&
      property_type.length != 0) ||
    (code_fletcher.includes(postal_input) &&
      location_input.includes("fletcher") &&
      property_type.length != 0) ||
    (code_flinthill.includes(postal_input) &&
      location_input.includes("flinthill") &&
      property_type.length != 0) ||
    (code_florissant.includes(postal_input) &&
      location_input.includes("florissant") &&
      property_type.length != 0) ||
    (code_foley.includes(postal_input) &&
      location_input.includes("foley") &&
      property_type.length != 0) ||
    (code_foristell.includes(postal_input) &&
      location_input.includes("foristell") &&
      property_type.length != 0) ||
    (code_french_village.includes(postal_input) &&
      location_input.includes("french village") &&
      property_type.length != 0) ||
    (code_gerald.includes(postal_input) &&
      location_input.includes("gerald") &&
      property_type.length != 0) ||
    (code_glencoe.includes(postal_input) &&
      location_input.includes("glencoe") &&
      property_type.length != 0) ||
    (code_gray_summit.includes(postal_input) &&
      location_input.includes("gray summit") &&
      property_type.length != 0) ||
    (code_grover.includes(postal_input) &&
      location_input.includes("grover") &&
      property_type.length != 0) ||
    (code_grubville.includes(postal_input) &&
      location_input.includes("grubville") &&
      property_type.length != 0) ||
    (code_hawk_point.includes(postal_input) &&
      location_input.includes("hawk point") &&
      property_type.length != 0) ||
    (code_hazelwood.includes(postal_input) &&
      location_input.includes("hazelwood") &&
      property_type.length != 0) ||
    (code_herculaneum.includes(postal_input) &&
      location_input.includes("herculaneum") &&
      property_type.length != 0) ||
    (code_high_hill.includes(postal_input) &&
      location_input.includes("high hill") &&
      property_type.length != 0) ||
    (code_high_ridge.includes(postal_input) &&
      location_input.includes("high ridge") &&
      property_type.length != 0) ||
    (code_hillsboro.includes(postal_input) &&
      location_input.includes("hillsboro") &&
      property_type.length != 0) ||
    (code_house_springs.includes(postal_input) &&
      location_input.includes("house springs") &&
      property_type.length != 0) ||
    (code_imperial.includes(postal_input) &&
      location_input.includes("imperial") &&
      property_type.length != 0) ||
    (code_jonesburg.includes(postal_input) &&
      location_input.includes("jonesburg") &&
      property_type.length != 0) ||
    (code_kimmswick.includes(postal_input) &&
      location_input.includes("kimmswick") &&
      property_type.length != 0) ||
    (code_labadie.includes(postal_input) &&
      location_input.includes("labadie") &&
      property_type.length != 0) ||
    (code_lake_saint_louis.includes(postal_input) &&
      location_input.includes("lake saint louis") &&
      property_type.length != 0) ||
    (code_leslie.includes(postal_input) &&
      location_input.includes("leslie") &&
      property_type.length != 0) ||
    (code_liguori.includes(postal_input) &&
      location_input.includes("liguori") &&
      property_type.length != 0) ||
    (code_lonedell.includes(postal_input) &&
      location_input.includes("lonedell") &&
      property_type.length != 0) ||
    (code_luebbering.includes(postal_input) &&
      location_input.includes("luebbering") &&
      property_type.length != 0) ||
    (code_mapaville.includes(postal_input) &&
      location_input.includes("mapaville") &&
      property_type.length != 0) ||
    (code_marthasville.includes(postal_input) &&
      location_input.includes("marthasville") &&
      property_type.length != 0) ||
    (code_maryland_heights.includes(postal_input) &&
      location_input.includes("maryland heights") &&
      property_type.length != 0) ||
    (code_montgomery_city.includes(postal_input) &&
      location_input.includes("montgomery") &&
      property_type.length != 0) ||
    (code_moscow_mills.includes(postal_input) &&
      location_input.includes("moscow mills") &&
      property_type.length != 0) ||
    (code_new_florence.includes(postal_input) &&
      location_input.includes("new florence") &&
      property_type.length != 0) ||
    (code_new_haven.includes(postal_input) &&
      location_input.includes("new haven") &&
      property_type.length != 0) ||
    (code_new_melle.includes(postal_input) &&
      location_input.includes("new melle") &&
      property_type.length != 0) ||
    (code_o_fallon.includes(postal_input) &&
      location_input.includes("o'fallon") &&
      property_type.length != 0) ||
    (code_old_monroe.includes(postal_input) &&
      location_input.includes("old monroe") &&
      property_type.length != 0) ||
    (code_pacific.includes(postal_input) &&
      location_input.includes("pacific") &&
      property_type.length != 0) ||
    (code_pevely.includes(postal_input) &&
      location_input.includes("pevely") &&
      property_type.length != 0) ||
    (code_portage_des_sioux.includes(postal_input) &&
      location_input.includes("portage des sioux") &&
      property_type.length != 0) ||
    (code_richwoods.includes(postal_input) &&
      location_input.includes("richwoods") &&
      property_type.length != 0) ||
    (code_robertsville.includes(postal_input) &&
      location_input.includes("robertsville") &&
      property_type.length != 0) ||
    (code_saint_albans.includes(postal_input) &&
      location_input.includes("saint albans") &&
      property_type.length != 0) ||
    (code_saint_albans.includes(postal_input) &&
      location_input.includes("st. albans") &&
      property_type.length != 0) ||
    (code_saint_ann.includes(postal_input) &&
      location_input.includes("saint ann") &&
      property_type.length != 0) ||
    (code_saint_ann.includes(postal_input) &&
      location_input.includes("st. ann") &&
      property_type.length != 0) ||
    (code_saint_charles.includes(postal_input) &&
      location_input.includes("saint charles") &&
      property_type.length != 0) ||
    (code_saint_charles.includes(postal_input) &&
      location_input.includes("st. charles") &&
      property_type.length != 0) ||
    (code_saint_clair.includes(postal_input) &&
      location_input.includes("saint clair") &&
      property_type.length != 0) ||
    (code_saint_clair.includes(postal_input) &&
      location_input.includes("st. claire") &&
      property_type.length != 0) ||
    (code_saint_louis.includes(postal_input) &&
      location_input.includes("saint louis") &&
      property_type.length != 0) ||
    (code_saint_louis.includes(postal_input) &&
      location_input.includes("st. louis") &&
      property_type.length != 0) ||
    (code_saint_peters.includes(postal_input) &&
      location_input.includes("saint peters") &&
      property_type.length != 0) ||
    (code_saint_peters.includes(postal_input) &&
      location_input.includes("st. peters") &&
      property_type.length != 0) ||
    (code_silex.includes(postal_input) &&
      location_input.includes("silex") &&
      property_type.length != 0) ||
    (code_stanton.includes(postal_input) &&
      location_input.includes("stanton") &&
      property_type.length != 0) ||
    (code_sullivan.includes(postal_input) &&
      location_input.includes("sullivan") &&
      property_type.length != 0) ||
    (code_troy.includes(postal_input) &&
      location_input.includes("troy") &&
      property_type.length != 0) ||
    (code_truxton.includes(postal_input) &&
      location_input.includes("truxton") &&
      property_type.length != 0) ||
    (code_union.includes(postal_input) &&
      location_input.includes("union") &&
      property_type.length != 0) ||
    (code_valles_mines.includes(postal_input) &&
      location_input.includes("valles mines") &&
      property_type.length != 0) ||
    (code_valley_park.includes(postal_input) &&
      location_input.includes("valley park") &&
      property_type.length != 0) ||
    (code_villa_ridge.includes(postal_input) &&
      location_input.includes("villa ridge") &&
      property_type.length != 0) ||
    (code_warrenton.includes(postal_input) &&
      location_input.includes("warrenton") &&
      property_type.length != 0) ||
    (code_washington.includes(postal_input) &&
      location_input.includes("washington") &&
      property_type.length != 0) ||
    (code_wentzville.includes(postal_input) &&
      location_input.includes("wentzville") &&
      property_type.length != 0) ||
    (code_west_alton.includes(postal_input) &&
      location_input.includes("west alton") &&
      property_type.length != 0) ||
    (code_whiteside.includes(postal_input) &&
      location_input.includes("whiteside") &&
      property_type.length != 0) ||
    (code_winfield.includes(postal_input) &&
      location_input.includes("winfield") &&
      property_type.length != 0) ||
    (code_wright_city.includes(postal_input) &&
      location_input.includes("wright city") &&
      property_type.length != 0) ||
    //rentsafe
    (code_apex.includes(postal_input) &&
      location_input.includes("apex") &&
      property_type.length != 0) ||
    (code_cary.includes(postal_input) &&
      location_input.includes("cary") &&
      property_type.length != 0) ||
    (code_chapel_hill.includes(postal_input) &&
      location_input.includes("chapel hill") &&
      property_type.length != 0) ||
    (code_clayton.includes(postal_input) &&
      location_input.includes("clayton") &&
      property_type.length != 0) ||
    (code_durham.includes(postal_input) &&
      location_input.includes("durham") &&
      property_type.length != 0) ||
    (code_fuquay_varina.includes(postal_input) &&
      location_input.includes("fuquay varina") &&
      property_type.length != 0) ||
    (code_fuquay_varina.includes(postal_input) &&
      location_input.includes("fuquay-varina") &&
      property_type.length != 0) ||
    (code_garner.includes(postal_input) &&
      location_input.includes("garner") &&
      property_type.length != 0) ||
    (code_holly_springs.includes(postal_input) &&
      location_input.includes("holly springs") &&
      property_type.length != 0) ||
    (code_knightdale.includes(postal_input) &&
      location_input.includes("knightdale") &&
      property_type.length != 0) ||
    (code_moncure.includes(postal_input) &&
      location_input.includes("moncure") &&
      property_type.length != 0) ||
    (code_morrisville.includes(postal_input) &&
      location_input.includes("morrisville") &&
      property_type.length != 0) ||
    (code_new_hill.includes(postal_input) &&
      location_input.includes("new hill") &&
      property_type.length != 0) ||
    (code_raleigh.includes(postal_input) &&
      location_input.includes("raleigh") &&
      property_type.length != 0) ||
    (code_rolesville.includes(postal_input) &&
      location_input.includes("rolesville") &&
      property_type.length != 0) ||
    (code_wake_forest.includes(postal_input) &&
      location_input.includes("wake forest") &&
      property_type.length != 0) ||
    (code_wendell.includes(postal_input) &&
      location_input.includes("wendell") &&
      property_type.length != 0) ||
    (code_willow_spring.includes(postal_input) &&
      location_input.includes("willow spring") &&
      property_type.length != 0) ||
    (code_zebulon.includes(postal_input) &&
      location_input.includes("zebulon") &&
      property_type.length != 0)
  ) {
    // if user_input has subsidiary zipcodes && locations display modal_subsidiary
    modal_subsidiary.style.display = "block";
  }
  // third statement if there is zipcode for poplar services but mismatch location
  else if (
    (code_portland.includes(postal_input) &&
      !location_input.includes("portland") &&
      property_type.length != 0) ||
    (code_eugene.includes(postal_input) &&
      !location_input.includes("eugene") &&
      property_type.length != 0) ||
    (code_nashville.includes(postal_input) &&
      !location_input.includes("nashville") &&
      property_type.length != 0) ||
    (code_antelope.includes(postal_input) &&
      !location_input.includes("antelope") &&
      property_type.length != 0) ||
    (code_carmichael.includes(postal_input) &&
      !location_input.includes("carmichael") &&
      property_type.length != 0) ||
    (code_citrus_heights.includes(postal_input) &&
      !location_input.includes("citrus heights") &&
      property_type.length != 0) ||
    (code_clarksburg.includes(postal_input) &&
      !location_input.includes("clarksburg") &&
      property_type.length != 0) ||
    (code_davis.includes(postal_input) &&
      !location_input.includes("davis") &&
      property_type.length != 0) ||
    (code_el_dorado_hills.includes(postal_input) &&
      !location_input.includes("el dorado") &&
      property_type.length != 0) ||
    (code_elk_grove.includes(postal_input) &&
      !location_input.includes("elk grove") &&
      property_type.length != 0) ||
    (code_elverta.includes(postal_input) &&
      !location_input.includes("elverta") &&
      property_type.length != 0) ||
    (code_fair_oaks.includes(postal_input) &&
      !location_input.includes("fair oaks") &&
      property_type.length != 0) ||
    (code_folsom.includes(postal_input) &&
      !location_input.includes("folsom") &&
      property_type.length != 0) ||
    (code_granite_bay.includes(postal_input) &&
      !location_input.includes("granite bay") &&
      property_type.length != 0) ||
    (code_hood.includes(postal_input) &&
      !location_input.includes("hood") &&
      property_type.length != 0) ||
    (code_mather.includes(postal_input) &&
      !location_input.includes("mather") &&
      property_type.length != 0) ||
    (code_mcclellan.includes(postal_input) &&
      !location_input.includes("mcclellan") &&
      property_type.length != 0) ||
    (code_north_highlands.includes(postal_input) &&
      !location_input.includes("north highlands") &&
      property_type.length != 0) ||
    (code_orangevale.includes(postal_input) &&
      !location_input.includes("orangevale") &&
      property_type.length != 0) ||
    (code_rancho_cordova.includes(postal_input) &&
      !location_input.includes("rancho cordova") &&
      property_type.length != 0) ||
    (code_represa.includes(postal_input) &&
      !location_input.includes("represa") &&
      property_type.length != 0) ||
    (code_rescue.includes(postal_input) &&
      !location_input.includes("rescue") &&
      property_type.length != 0) ||
    (code_rio_linda.includes(postal_input) &&
      !location_input.includes("rio linda") &&
      property_type.length != 0) ||
    (code_rocklin.includes(postal_input) &&
      !location_input.includes("rocklin") &&
      property_type.length != 0) ||
    (code_roseville.includes(postal_input) &&
      !location_input.includes("rosevill") &&
      property_type.length != 0) ||
    (code_sacramento.includes(postal_input) &&
      !location_input.includes("sacramento") &&
      property_type.length != 0) ||
    (code_west_sacramento.includes(postal_input) &&
      !location_input.includes("west sacramento") &&
      property_type.length != 0) ||
    (code_woodland.includes(postal_input) &&
      !location_input.includes("woodland") &&
      property_type.length != 0) ||
    (code_yolo.includes(postal_input) &&
      !location_input.includes("yolo") &&
      property_type.length != 0) ||
    (code_bellevue.includes(postal_input) &&
      !location_input.includes("bellevue") &&
      property_type.length != 0) ||
    (code_bothel.includes(postal_input) &&
      !location_input.includes("bothel") &&
      property_type.length != 0) ||
    (code_edmonds.includes(postal_input) &&
      !location_input.includes("edmonds") &&
      property_type.length != 0) ||
    (code_everett.includes(postal_input) &&
      !location_input.includes("everett") &&
      property_type.length != 0) ||
    (code_issaquah.includes(postal_input) &&
      !location_input.includes("issaquah") &&
      property_type.length != 0) ||
    (code_kenmore.includes(postal_input) &&
      !location_input.includes("kenmore") &&
      property_type.length != 0) ||
    (code_kent.includes(postal_input) &&
      !location_input.includes("kent") &&
      property_type.length != 0) ||
    (code_kirkland.includes(postal_input) &&
      !location_input.includes("kirkland") &&
      property_type.length != 0) ||
    (code_lynnwood.includes(postal_input) &&
      !location_input.includes("lynnwood") &&
      property_type.length != 0) ||
    (code_medina.includes(postal_input) &&
      !location_input.includes("medina") &&
      property_type.length != 0) ||
    (code_mercer_island.includes(postal_input) &&
      !location_input.includes("mercer") &&
      property_type.length != 0) ||
    (code_mill_creek.includes(postal_input) &&
      !location_input.includes("mill creek") &&
      property_type.length != 0) ||
    (code_mountlake_terrace.includes(postal_input) &&
      !location_input.includes("mountlake terrace") &&
      property_type.length != 0) ||
    (code_mukilteo.includes(postal_input) &&
      !location_input.includes("mukilteo") &&
      property_type.length != 0) ||
    (code_redmond.includes(postal_input) &&
      !location_input.includes("redmond") &&
      property_type.length != 0) ||
    (code_renton.includes(postal_input) &&
      !location_input.includes("renton") &&
      property_type.length != 0) ||
    (code_sammamish.includes(postal_input) &&
      !location_input.includes("sammamish") &&
      property_type.length != 0) ||
    (code_seahurst.includes(postal_input) &&
      !location_input.includes("seahurst") &&
      property_type.length != 0) ||
    (code_seattle.includes(postal_input) &&
      !location_input.includes("seattle") &&
      property_type.length != 0) ||
    (code_alhambra.includes(postal_input) &&
      !location_input.includes("alhambra") &&
      property_type.length != 0) ||
    (code_altadena.includes(postal_input) &&
      !location_input.includes("altadena") &&
      property_type.length != 0) ||
    (code_arcadia.includes(postal_input) &&
      !location_input.includes("arcadia") &&
      property_type.length != 0) ||
    (code_bell.includes(postal_input) &&
      !location_input.includes("bell") &&
      property_type.length != 0) ||
    (code_bell_gardens.includes(postal_input) &&
      !location_input.includes("bell gardens") &&
      property_type.length != 0) ||
    (code_bellflower.includes(postal_input) &&
      !location_input.includes("bellflower") &&
      property_type.length != 0) ||
    (code_beverly_hills.includes(postal_input) &&
      !location_input.includes("beverly hills") &&
      property_type.length != 0) ||
    (code_burbank.includes(postal_input) &&
      !location_input.includes("burbank") &&
      property_type.length != 0) ||
    (code_canoga_park.includes(postal_input) &&
      !location_input.includes("canoga park") &&
      property_type.length != 0) ||
    (code_carson.includes(postal_input) &&
      !location_input.includes("carson") &&
      property_type.length != 0) ||
    (code_chatsworth.includes(postal_input) &&
      !location_input.includes("chatsworth") &&
      property_type.length != 0) ||
    (code_city_of_industry.includes(postal_input) &&
      !location_input.includes("city of industry") &&
      property_type.length != 0) ||
    (code_compton.includes(postal_input) &&
      !location_input.includes("compton") &&
      property_type.length != 0) ||
    (code_culver_city.includes(postal_input) &&
      !location_input.includes("culver") &&
      property_type.length != 0) ||
    (code_dodgertown.includes(postal_input) &&
      !location_input.includes("dodgertown") &&
      property_type.length != 0) ||
    (code_downey.includes(postal_input) &&
      !location_input.includes("downey") &&
      property_type.length != 0) ||
    (code_duarte.includes(postal_input) &&
      !location_input.includes("duarte") &&
      property_type.length != 0) ||
    (code_el_monte.includes(postal_input) &&
      !location_input.includes("el monte") &&
      property_type.length != 0) ||
    (code_el_segundo.includes(postal_input) &&
      !location_input.includes("el segundo") &&
      property_type.length != 0) ||
    (code_gardena.includes(postal_input) &&
      !location_input.includes("gardena") &&
      property_type.length != 0) ||
    (code_glendale.includes(postal_input) &&
      !location_input.includes("glendale") &&
      property_type.length != 0) ||
    (code_granada_hills.includes(postal_input) &&
      !location_input.includes("granada hills") &&
      property_type.length != 0) ||
    (code_harbor_city.includes(postal_input) &&
      !location_input.includes("harbor") &&
      property_type.length != 0) ||
    (code_hawthorne.includes(postal_input) &&
      !location_input.includes("hawthorne") &&
      property_type.length != 0) ||
    (code_hermosa_beach.includes(postal_input) &&
      !location_input.includes("hermosa beach") &&
      property_type.length != 0) ||
    (code_huntington_park.includes(postal_input) &&
      !location_input.includes("huntington park") &&
      property_type.length != 0) ||
    (code_inglewood.includes(postal_input) &&
      !location_input.includes("inglewood") &&
      property_type.length != 0) ||
    (code_la_cañada_flintridge.includes(postal_input) &&
      !location_input.includes("la cañada flintridge") &&
      property_type.length != 0) ||
    (code_la_crescenta.includes(postal_input) &&
      !location_input.includes("la crescenta") &&
      property_type.length != 0) ||
    (code_lakewood.includes(postal_input) &&
      !location_input.includes("lakewood") &&
      property_type.length != 0) ||
    (code_lawndale.includes(postal_input) &&
      !location_input.includes("lawndale") &&
      property_type.length != 0) ||
    (code_lomita.includes(postal_input) &&
      !location_input.includes("lomita") &&
      property_type.length != 0) ||
    (code_long_beach.includes(postal_input) &&
      !location_input.includes("long beach") &&
      property_type.length != 0) ||
    (code_los_angeles.includes(postal_input) &&
      !location_input.includes("los angeles") &&
      property_type.length != 0) ||
    (code_lynwood.includes(postal_input) &&
      !location_input.includes("lynwood") &&
      property_type.length != 0) ||
    (code_manhattan_beach.includes(postal_input) &&
      !location_input.includes("manhattan beach") &&
      property_type.length != 0) ||
    (code_marina_del_rey.includes(postal_input) &&
      !location_input.includes("marina del rey") &&
      property_type.length != 0) ||
    (code_maywood.includes(postal_input) &&
      !location_input.includes("maywood") &&
      property_type.length != 0) ||
    (code_mission_hills.includes(postal_input) &&
      !location_input.includes("mission hills") &&
      property_type.length != 0) ||
    (code_monrovia.includes(postal_input) &&
      !location_input.includes("monrovia") &&
      property_type.length != 0) ||
    (code_montebello.includes(postal_input) &&
      !location_input.includes("montebello") &&
      property_type.length != 0) ||
    (code_monterey_park.includes(postal_input) &&
      !location_input.includes("monterey park") &&
      property_type.length != 0) ||
    (code_montrose.includes(postal_input) &&
      !location_input.includes("montrose") &&
      property_type.length != 0) ||
    (code_north_hills.includes(postal_input) &&
      !location_input.includes("north hills") &&
      property_type.length != 0) ||
    (code_north_hollywood.includes(postal_input) &&
      !location_input.includes("hollywood") &&
      property_type.length != 0) ||
    (code_northridge.includes(postal_input) &&
      !location_input.includes("northridge") &&
      property_type.length != 0) ||
    (code_pacoima.includes(postal_input) &&
      !location_input.includes("pacoima") &&
      property_type.length != 0) ||
    (code_palos_verdes_peninsula.includes(postal_input) &&
      !location_input.includes("palos verdes") &&
      property_type.length != 0) ||
    (code_panorama_city.includes(postal_input) &&
      !location_input.includes("panorama") &&
      property_type.length != 0) ||
    (code_paramount.includes(postal_input) &&
      !location_input.includes("paramount") &&
      property_type.length != 0) ||
    (code_pasadena.includes(postal_input) &&
      !location_input.includes("pasadena") &&
      property_type.length != 0) ||
    (code_pico_rivera.includes(postal_input) &&
      !location_input.includes("pico rivera") &&
      property_type.length != 0) ||
    (code_playa_del_rey.includes(postal_input) &&
      !location_input.includes("playa del rey") &&
      property_type.length != 0) ||
    (code_porter_ranch.includes(postal_input) &&
      !location_input.includes("porter ranch") &&
      property_type.length != 0) ||
    (code_rancho_palos_verdes.includes(postal_input) &&
      !location_input.includes("rancho palos verdes") &&
      property_type.length != 0) ||
    (code_redondo_beach.includes(postal_input) &&
      !location_input.includes("redondo beach") &&
      property_type.length != 0) ||
    (code_reseda.includes(postal_input) &&
      !location_input.includes("reseda") &&
      property_type.length != 0) ||
    (code_rosemead.includes(postal_input) &&
      !location_input.includes("rosemead") &&
      property_type.length != 0) ||
    (code_san_fernando.includes(postal_input) &&
      !location_input.includes("san fernando") &&
      property_type.length != 0) ||
    (code_san_gabriel.includes(postal_input) &&
      !location_input.includes("san gabriel") &&
      property_type.length != 0) ||
    (code_san_marino.includes(postal_input) &&
      !location_input.includes("san marino") &&
      property_type.length != 0) ||
    (code_san_pedro.includes(postal_input) &&
      !location_input.includes("san pedro") &&
      property_type.length != 0) ||
    (code_santa_monica.includes(postal_input) &&
      !location_input.includes("santa monica") &&
      property_type.length != 0) ||
    (code_sierra_madre.includes(postal_input) &&
      !location_input.includes("sierra madre") &&
      property_type.length != 0) ||
    (code_signal_hill.includes(postal_input) &&
      !location_input.includes("signal hill") &&
      property_type.length != 0) ||
    (code_south_el_monte.includes(postal_input) &&
      !location_input.includes("south el monte") &&
      property_type.length != 0) ||
    (code_south_gate.includes(postal_input) &&
      !location_input.includes("south gate") &&
      property_type.length != 0) ||
    (code_south_pasadena.includes(postal_input) &&
      !location_input.includes("south pasadena") &&
      property_type.length != 0) ||
    (code_studio_city.includes(postal_input) &&
      !location_input.includes("studio") &&
      property_type.length != 0) ||
    (code_sun_valley.includes(postal_input) &&
      !location_input.includes("sun valley") &&
      property_type.length != 0) ||
    (code_sylmar.includes(postal_input) &&
      !location_input.includes("sylmar") &&
      property_type.length != 0) ||
    (code_tarzana.includes(postal_input) &&
      !location_input.includes("tarzana") &&
      property_type.length != 0) ||
    (code_temple_city.includes(postal_input) &&
      !location_input.includes("temple") &&
      property_type.length != 0) ||
    (code_toluca_lake.includes(postal_input) &&
      !location_input.includes("toluca lake") &&
      property_type.length != 0) ||
    (code_torrance.includes(postal_input) &&
      !location_input.includes("torrance") &&
      property_type.length != 0) ||
    (code_tujunga.includes(postal_input) &&
      !location_input.includes("tujunga") &&
      property_type.length != 0) ||
    (code_universal_city.includes(postal_input) &&
      !location_input.includes("universal") &&
      property_type.length != 0) ||
    (code_valencia.includes(postal_input) &&
      !location_input.includes("valencia") &&
      property_type.length != 0) ||
    (code_valley_village.includes(postal_input) &&
      !location_input.includes("valley village") &&
      property_type.length != 0) ||
    (code_van_nuys.includes(postal_input) &&
      !location_input.includes("van nuys") &&
      property_type.length != 0) ||
    (code_venice.includes(postal_input) &&
      !location_input.includes("venice") &&
      property_type.length != 0) ||
    (code_verdugo_city.includes(postal_input) &&
      !location_input.includes("verdugo") &&
      property_type.length != 0) ||
    (code_west_hills.includes(postal_input) &&
      !location_input.includes("west hills") &&
      property_type.length != 0) ||
    (code_west_hollywood.includes(postal_input) &&
      !location_input.includes("west hollywood") &&
      property_type.length != 0) ||
    (code_wilmington.includes(postal_input) &&
      !location_input.includes("wilmington") &&
      property_type.length != 0) ||
    (code_winnetka.includes(postal_input) &&
      !location_input.includes("winnetka") &&
      property_type.length != 0) ||
    (code_woodland_hills.includes(postal_input) &&
      !location_input.includes("woodland hills") &&
      property_type.length != 0) ||
    (code_alameda.includes(postal_input) &&
      !location_input.includes("alameda") &&
      property_type.length != 0) ||
    (code_alamo.includes(postal_input) &&
      !location_input.includes("alamo") &&
      property_type.length != 0) ||
    (code_albany.includes(postal_input) &&
      !location_input.includes("albany") &&
      property_type.length != 0) ||
    (code_alviso.includes(postal_input) &&
      !location_input.includes("alviso") &&
      property_type.length != 0) ||
    (code_antioch.includes(postal_input) &&
      !location_input.includes("antioch") &&
      property_type.length != 0) ||
    (code_atherton.includes(postal_input) &&
      !location_input.includes("atherton") &&
      property_type.length != 0) ||
    (postal_input.includes(code_belmont) &&
      !location_input.includes("belmont") &&
      property_type.length != 0) ||
    (code_belvedere_tiburon.includes(postal_input) &&
      !location_input.includes("tiburon") &&
      property_type.length != 0) ||
    (code_berkeley.includes(postal_input) &&
      !location_input.includes("berkeley") &&
      property_type.length != 0) ||
    (code_brentwood.includes(postal_input) &&
      !location_input.includes("brentwood") &&
      property_type.length != 0) ||
    (postal_input.includes(code_brisbane) &&
      !location_input.includes("brisbane") &&
      property_type.length != 0) ||
    (code_burlingame.includes(postal_input) &&
      !location_input.includes("burlingame") &&
      property_type.length != 0) ||
    (code_byron.includes(postal_input) &&
      !location_input.includes("byron") &&
      property_type.length != 0) ||
    (code_campbell.includes(postal_input) &&
      !location_input.includes("campbell") &&
      property_type.length != 0) ||
    (code_canyon.includes(postal_input) &&
      !location_input.includes("canyon") &&
      property_type.length != 0) ||
    (code_capitola.includes(postal_input) &&
      !location_input.includes("capitola") &&
      property_type.length != 0) ||
    (code_castro_valley.includes(postal_input) &&
      !location_input.includes("castro valley") &&
      property_type.length != 0) ||
    (code_clayton.includes(postal_input) &&
      !location_input.includes("clayton") &&
      property_type.length != 0) ||
    (code_concord.includes(postal_input) &&
      !location_input.includes("concord") &&
      property_type.length != 0) ||
    (code_corte_madera.includes(postal_input) &&
      !location_input.includes("corte madera") &&
      property_type.length != 0) ||
    (code_coyote.includes(postal_input) &&
      !location_input.includes("coyote") &&
      property_type.length != 0) ||
    (code_crockett.includes(postal_input) &&
      !location_input.includes("crockett") &&
      property_type.length != 0) ||
    (code_cupertino.includes(postal_input) &&
      !location_input.includes("cupertino") &&
      property_type.length != 0) ||
    (code_daly_city.includes(postal_input) &&
      !location_input.includes("daly") &&
      property_type.length != 0) ||
    (code_danville.includes(postal_input) &&
      !location_input.includes("danville") &&
      property_type.length != 0) ||
    (code_diablo.includes(postal_input) &&
      !location_input.includes("diablo") &&
      property_type.length != 0) ||
    (code_dublin.includes(postal_input) &&
      !location_input.includes("dublin") &&
      property_type.length != 0) ||
    (code_el_cerrito.includes(postal_input) &&
      !location_input.includes("el cerrito") &&
      property_type.length != 0) ||
    (code_el_granada.includes(postal_input) &&
      !location_input.includes("el granada") &&
      property_type.length != 0) ||
    (code_el_sobrante.includes(postal_input) &&
      !location_input.includes("el sobrante") &&
      property_type.length != 0) ||
    (code_emeryville.includes(postal_input) &&
      !location_input.includes("emeryville") &&
      property_type.length != 0) ||
    (code_fremont.includes(postal_input) &&
      !location_input.includes("fremont") &&
      property_type.length != 0) ||
    (code_gilroy.includes(postal_input) &&
      !location_input.includes("gilroy") &&
      property_type.length != 0) ||
    (code_greenbrae.includes(postal_input) &&
      !location_input.includes("greenbrae") &&
      property_type.length != 0) ||
    (code_half_moon_bay.includes(postal_input) &&
      !location_input.includes("half moon bay") &&
      property_type.length != 0) ||
    (code_hayward.includes(postal_input) &&
      !location_input.includes("hayward") &&
      property_type.length != 0) ||
    (code_hercules.includes(postal_input) &&
      !location_input.includes("hercules") &&
      property_type.length != 0) ||
    (code_kentfield.includes(postal_input) &&
      !location_input.includes("kentfield") &&
      property_type.length != 0) ||
    (code_lafayette.includes(postal_input) &&
      !location_input.includes("lafayette") &&
      property_type.length != 0) ||
    (code_larkspur.includes(postal_input) &&
      !location_input.includes("larkspur") &&
      property_type.length != 0) ||
    (code_livermore.includes(postal_input) &&
      !location_input.includes("livermore") &&
      property_type.length != 0) ||
    (code_los_altos.includes(postal_input) &&
      !location_input.includes("los altos") &&
      property_type.length != 0) ||
    (code_los_gatos.includes(postal_input) &&
      !location_input.includes("los gatos") &&
      property_type.length != 0) ||
    (code_martinez.includes(postal_input) &&
      !location_input.includes("martinez") &&
      property_type.length != 0) ||
    (code_menlo_park.includes(postal_input) &&
      !location_input.includes("menlo park") &&
      property_type.length != 0) ||
    (code_mill_valley.includes(postal_input) &&
      !location_input.includes("mill valley") &&
      property_type.length != 0) ||
    (code_millbrae.includes(postal_input) &&
      !location_input.includes("millbrae") &&
      property_type.length != 0) ||
    (code_milpitas.includes(postal_input) &&
      !location_input.includes("milpitas") &&
      property_type.length != 0) ||
    (code_montara.includes(postal_input) &&
      !location_input.includes("montara") &&
      property_type.length != 0) ||
    (code_moraga.includes(postal_input) &&
      !location_input.includes("moraga") &&
      property_type.length != 0) ||
    (code_morgan_hill.includes(postal_input) &&
      !location_input.includes("morgan hill") &&
      property_type.length != 0) ||
    (code_moss_beach.includes(postal_input) &&
      !location_input.includes("moss beach") &&
      property_type.length != 0) ||
    (code_mountain_view.includes(postal_input) &&
      !location_input.includes("mountain view") &&
      property_type.length != 0) ||
    (code_newark.includes(postal_input) &&
      !location_input.includes("newark") &&
      property_type.length != 0) ||
    (code_oakland.includes(postal_input) &&
      !location_input.includes("oakland") &&
      property_type.length != 0) ||
    (code_orinda.includes(postal_input) &&
      !location_input.includes("orinda") &&
      property_type.length != 0) ||
    (code_pacifica.includes(postal_input) &&
      !location_input.includes("pacifica") &&
      property_type.length != 0) ||
    (code_palo_alto.includes(postal_input) &&
      !location_input.includes("palo alto") &&
      property_type.length != 0) ||
    (code_piedmont.includes(postal_input) &&
      !location_input.includes("piedmont") &&
      property_type.length != 0) ||
    (code_pinole.includes(postal_input) &&
      !location_input.includes("pinole") &&
      property_type.length != 0) ||
    (code_pittsburg.includes(postal_input) &&
      !location_input.includes("pittsburg") &&
      property_type.length != 0) ||
    (code_pleasant_hill.includes(postal_input) &&
      !location_input.includes("pleasant hill") &&
      property_type.length != 0) ||
    (code_pleasanton.includes(postal_input) &&
      !location_input.includes("pleasanton") &&
      property_type.length != 0) ||
    (code_port_costa.includes(postal_input) &&
      !location_input.includes("port costa") &&
      property_type.length != 0) ||
    (code_redwood_city.includes(postal_input) &&
      !location_input.includes("redwood") &&
      property_type.length != 0) ||
    (code_richmond.includes(postal_input) &&
      !location_input.includes("richmond") &&
      property_type.length != 0) ||
    (code_rodeo.includes(postal_input) &&
      !location_input.includes("rodeo") &&
      property_type.length != 0) ||
    (code_ross.includes(postal_input) &&
      !location_input.includes("ross") &&
      property_type.length != 0) ||
    (code_san_anselmo.includes(postal_input) &&
      !location_input.includes("san anselmo") &&
      property_type.length != 0) ||
    (code_san_bruno.includes(postal_input) &&
      !location_input.includes("san bruno") &&
      property_type.length != 0) ||
    (code_san_carlos.includes(postal_input) &&
      !location_input.includes("san carlos") &&
      property_type.length != 0) ||
    (code_san_francisco.includes(postal_input) &&
      !location_input.includes("san francisco") &&
      property_type.length != 0) ||
    (code_san_jose.includes(postal_input) &&
      !location_input.includes("san jose") &&
      property_type.length != 0) ||
    (code_san_leandro.includes(postal_input) &&
      !location_input.includes("san leandro") &&
      property_type.length != 0) ||
    (code_lorenzo.includes(postal_input) &&
      !location_input.includes("lorenzo") &&
      property_type.length != 0) ||
    (code_san_martin.includes(postal_input) &&
      !location_input.includes("san martin") &&
      property_type.length != 0) ||
    (code_san_mateo.includes(postal_input) &&
      !location_input.includes("san mateo") &&
      property_type.length != 0) ||
    (code_san_pablo.includes(postal_input) &&
      !location_input.includes("san pablo") &&
      property_type.length != 0) ||
    (code_san_quentin.includes(postal_input) &&
      !location_input.includes("san quentin") &&
      property_type.length != 0) ||
    (code_san_rafael.includes(postal_input) &&
      !location_input.includes("san rafael") &&
      property_type.length != 0) ||
    (code_san_ramon.includes(postal_input) &&
      !location_input.includes("san ramon") &&
      property_type.length != 0) ||
    (code_santa_clara.includes(postal_input) &&
      !location_input.includes("santa clara") &&
      property_type.length != 0) ||
    (code_santa_cruz.includes(postal_input) &&
      !location_input.includes("santa cruz") &&
      property_type.length != 0) ||
    (code_saratoga.includes(postal_input) &&
      !location_input.includes("saratoga") &&
      property_type.length != 0) ||
    (code_sausalito.includes(postal_input) &&
      !location_input.includes("sausalito") &&
      property_type.length != 0) ||
    (code_scotts_valley.includes(postal_input) &&
      !location_input.includes("scotts valley") &&
      property_type.length != 0) ||
    (code_south_san_francisco.includes(postal_input) &&
      !location_input.includes("south san francisco") &&
      property_type.length != 0) ||
    (code_stanford.includes(postal_input) &&
      !location_input.includes("stanford") &&
      property_type.length != 0) ||
    (code_sunnyvale.includes(postal_input) &&
      !location_input.includes("sunnyvale") &&
      property_type.length != 0) ||
    (code_sunol.includes(postal_input) &&
      !location_input.includes("sunol") &&
      property_type.length != 0) ||
    (code_tracy.includes(postal_input) &&
      !location_input.includes("tracy") &&
      property_type.length != 0) ||
    (code_union_city.includes(postal_input) &&
      !location_input.includes("union city") &&
      property_type.length != 0) ||
    (code_vallejo.includes(postal_input) &&
      !location_input.includes("vallejo") &&
      property_type.length != 0) ||
    (code_walnut_creek.includes(postal_input) &&
      !location_input.includes("walnut creek") &&
      property_type.length != 0) ||
    (code_bonita.includes(postal_input) &&
      !location_input.includes("bonita") &&
      property_type.length != 0) ||
    (code_bonsall.includes(postal_input) &&
      !location_input.includes("bonsall") &&
      property_type.length != 0) ||
    (code_cardiff_by_the_sea.includes(postal_input) &&
      !location_input.includes("cardiff") &&
      property_type.length != 0) ||
    (code_cardiff_by_the_sea.includes(postal_input) &&
      !location_input.includes("cardiff-by-the-sea") &&
      property_type.length != 0) ||
    (code_carlsbad.includes(postal_input) &&
      !location_input.includes("carlsbad") &&
      property_type.length != 0) ||
    (code_chula_vista.includes(postal_input) &&
      !location_input.includes("chula vista") &&
      property_type.length != 0) ||
    (code_coronado.includes(postal_input) &&
      !location_input.includes("coronado") &&
      property_type.length != 0) ||
    (code_del_mar.includes(postal_input) &&
      !location_input.includes("del mar") &&
      property_type.length != 0) ||
    (code_el_cajon.includes(postal_input) &&
      !location_input.includes("el cajon") &&
      property_type.length != 0) ||
    (code_encinitas.includes(postal_input) &&
      !location_input.includes("encinitas") &&
      property_type.length != 0) ||
    (code_escondido.includes(postal_input) &&
      !location_input.includes("escondido") &&
      property_type.length != 0) ||
    (code_fallbrook.includes(postal_input) &&
      !location_input.includes("fallbrook") &&
      property_type.length != 0) ||
    (code_imperial_beach.includes(postal_input) &&
      !location_input.includes("imperial beach") &&
      property_type.length != 0) ||
    (code_la_jolla.includes(postal_input) &&
      !location_input.includes("la jolla") &&
      property_type.length != 0) ||
    (code_la_mesa.includes(postal_input) &&
      !location_input.includes("la mesa") &&
      property_type.length != 0) ||
    (code_lemon_grove.includes(postal_input) &&
      !location_input.includes("lemon grove") &&
      property_type.length != 0) ||
    (code_national_city.includes(postal_input) &&
      !location_input.includes("national") &&
      property_type.length != 0) ||
    (code_oceanside.includes(postal_input) &&
      !location_input.includes("oceanside") &&
      property_type.length != 0) ||
    (code_poway.includes(postal_input) &&
      !location_input.includes("poway") &&
      property_type.length != 0) ||
    (code_rancho_santa_fe.includes(postal_input) &&
      !location_input.includes("rancho santa fe") &&
      property_type.length != 0) ||
    (code_san_diego.includes(postal_input) &&
      !location_input.includes("san diego") &&
      property_type.length != 0) ||
    (code_san_luis_rey.includes(postal_input) &&
      !location_input.includes("san luis rey") &&
      property_type.length != 0) ||
    (code_san_marcos.includes(postal_input) &&
      !location_input.includes("san marcos") &&
      property_type.length != 0) ||
    (code_san_ysidro.includes(postal_input) &&
      !location_input.includes("san ysidro") &&
      property_type.length != 0) ||
    (code_santee.includes(postal_input) &&
      !location_input.includes("santee") &&
      property_type.length != 0) ||
    (code_solana_beach.includes(postal_input) &&
      !location_input.includes("solana beach") &&
      property_type.length != 0) ||
    (code_spring_valley.includes(postal_input) &&
      !location_input.includes("spring valley") &&
      property_type.length != 0) ||
    (code_vista.includes(postal_input) &&
      !location_input.includes("vista") &&
      property_type.length != 0) ||
    (code_aliso_viejo.includes(postal_input) &&
      !location_input.includes("aliso viejo") &&
      property_type.length != 0) ||
    (code_bloomington.includes(postal_input) &&
      !location_input.includes("bloomington") &&
      property_type.length != 0) ||
    (code_bryn_mawr.includes(postal_input) &&
      !location_input.includes("bryn mawr") &&
      property_type.length != 0) ||
    (code_buena_park.includes(postal_input) &&
      !location_input.includes("buena park") &&
      property_type.length != 0) ||
    (code_capistrano_beach.includes(postal_input) &&
      !location_input.includes("capistrano beach") &&
      property_type.length != 0) ||
    (code_chino.includes(postal_input) &&
      !location_input.includes("chino") &&
      property_type.length != 0) ||
    (code_claremont.includes(postal_input) &&
      !location_input.includes("claremont") &&
      property_type.length != 0) ||
    (code_colton.includes(postal_input) &&
      !location_input.includes("colton") &&
      property_type.length != 0) ||
    (code_corona.includes(postal_input) &&
      !location_input.includes("corona") &&
      property_type.length != 0) ||
    (code_dana_point.includes(postal_input) &&
      !location_input.includes("dana point") &&
      property_type.length != 0) ||
    (code_el_toro.includes(postal_input) &&
      !location_input.includes("el toro") &&
      property_type.length != 0) ||
    (code_fontana.includes(postal_input) &&
      !location_input.includes("fontana") &&
      property_type.length != 0) ||
    (code_grand_terrace.includes(postal_input) &&
      !location_input.includes("grand terrace") &&
      property_type.length != 0) ||
    (code_guasti.includes(postal_input) &&
      !location_input.includes("guasti") &&
      property_type.length != 0) ||
    (code_highland.includes(postal_input) &&
      !location_input.includes("highland") &&
      property_type.length != 0) ||
    (code_irvine.includes(postal_input) &&
      !location_input.includes("irvine") &&
      property_type.length != 0) ||
    (code_ladera_ranch.includes(postal_input) &&
      !location_input.includes("ladera ranch") &&
      property_type.length != 0) ||
    (code_laguna_beach.includes(postal_input) &&
      !location_input.includes("laguna beach") &&
      property_type.length != 0) ||
    (code_laguna_hills.includes(postal_input) &&
      !location_input.includes("laguna hills") &&
      property_type.length != 0) ||
    (code_laguna_niguel.includes(postal_input) &&
      !location_input.includes("laguna niguel") &&
      property_type.length != 0) ||
    (code_laguna_woods.includes(postal_input) &&
      !location_input.includes("laguna woods") &&
      property_type.length != 0) ||
    (code_lake_forest.includes(postal_input) &&
      !location_input.includes("lake forest") &&
      property_type.length != 0) ||
    (code_loma_linda.includes(postal_input) &&
      !location_input.includes("loma linda") &&
      property_type.length != 0) ||
    (code_march_air_reserve_base.includes(postal_input) &&
      !location_input.includes("march air reserve") &&
      property_type.length != 0) ||
    (code_mira_loma.includes(postal_input) &&
      !location_input.includes("mira loma") &&
      property_type.length != 0) ||
    (code_mission_viejo.includes(postal_input) &&
      !location_input.includes("mission viejo") &&
      property_type.length != 0) ||
    (code_montclair.includes(postal_input) &&
      !location_input.includes("montclair") &&
      property_type.length != 0) ||
    (code_moreno_valley.includes(postal_input) &&
      !location_input.includes("moreno valley") &&
      property_type.length != 0) ||
    (code_norco.includes(postal_input) &&
      !location_input.includes("norco") &&
      property_type.length != 0) ||
    (code_ontario.includes(postal_input) &&
      !location_input.includes("ontario") &&
      property_type.length != 0) ||
    (code_patton.includes(postal_input) &&
      !location_input.includes("patton") &&
      property_type.length != 0) ||
    (code_perris.includes(postal_input) &&
      !location_input.includes("perris") &&
      property_type.length != 0) ||
    (code_pomona.includes(postal_input) &&
      !location_input.includes("pomona") &&
      property_type.length != 0) ||
    (code_ranco_cucamonga.includes(postal_input) &&
      !location_input.includes("rancho cucamonga") &&
      property_type.length != 0) ||
    (code_rancho_santa_margarita.includes(postal_input) &&
      !location_input.includes("rancho santa margarita") &&
      property_type.length != 0) ||
    (code_redlands.includes(postal_input) &&
      !location_input.includes("redlands") &&
      property_type.length != 0) ||
    (code_rialto.includes(postal_input) &&
      !location_input.includes("rialto") &&
      property_type.length != 0) ||
    (code_riverside.includes(postal_input) &&
      !location_input.includes("riverside") &&
      property_type.length != 0) ||
    (code_san_bernardino.includes(postal_input) &&
      !location_input.includes("san bernardino") &&
      property_type.length != 0) ||
    (code_san_clemente.includes(postal_input) &&
      !location_input.includes("san clemente") &&
      property_type.length != 0) ||
    (code_san_dimas.includes(postal_input) &&
      !location_input.includes("san dimas") &&
      property_type.length != 0) ||
    (code_san_juan_capistrano.includes(postal_input) &&
      !location_input.includes("san juan capistrano") &&
      property_type.length != 0) ||
    (code_upland.includes(postal_input) &&
      !location_input.includes("upland") &&
      property_type.length != 0) ||
    (code_arvada.includes(postal_input) &&
      !location_input.includes("arvada") &&
      property_type.length != 0) ||
    (code_aurora.includes(postal_input) &&
      !location_input.includes("aurora") &&
      property_type.length != 0) ||
    (code_boulder.includes(postal_input) &&
      !location_input.includes("boulder") &&
      property_type.length != 0) ||
    (code_brighton.includes(postal_input) &&
      !location_input.includes("brighton") &&
      property_type.length != 0) ||
    (code_broomfield.includes(postal_input) &&
      !location_input.includes("broomfield") &&
      property_type.length != 0) ||
    (code_commerce_city.includes(postal_input) &&
      !location_input.includes("commerce city") &&
      property_type.length != 0) ||
    (code_denver.includes(postal_input) &&
      !location_input.includes("denver") &&
      property_type.length != 0) ||
    (code_dupont.includes(postal_input) &&
      !location_input.includes("dupont") &&
      property_type.length != 0) ||
    (code_eastlake.includes(postal_input) &&
      !location_input.includes("eastlake") &&
      property_type.length != 0) ||
    (code_englewood.includes(postal_input) &&
      !location_input.includes("englewood") &&
      property_type.length != 0) ||
    (code_henderson.includes(postal_input) &&
      !location_input.includes("henderson") &&
      property_type.length != 0) ||
    (code_littleton.includes(postal_input) &&
      !location_input.includes("littleton") &&
      property_type.length != 0) ||
    (code_westminster.includes(postal_input) &&
      !location_input.includes("westminster") &&
      property_type.length != 0) ||
    (code_blue_diamond.includes(postal_input) &&
      !location_input.includes("blue diamond") &&
      property_type.length != 0) ||
    (code_boulder_city.includes(postal_input) &&
      !location_input.includes("boulder") &&
      property_type.length != 0) ||
    (code_bunkerville.includes(postal_input) &&
      !location_input.includes("bunkerville") &&
      property_type.length != 0) ||
    (code_cal_nev_ari.includes(postal_input) &&
      !location_input.includes("cal nev ari") &&
      property_type.length != 0) ||
    (code_coyote_springs.includes(postal_input) &&
      !location_input.includes("coyote springs") &&
      property_type.length != 0) ||
    (code_henderson.includes(postal_input) &&
      !location_input.includes("henderson") &&
      property_type.length != 0) ||
    (code_indian_springs.includes(postal_input) &&
      !location_input.includes("indian springs") &&
      property_type.length != 0) ||
    (code_jean.includes(postal_input) &&
      !location_input.includes("jean") &&
      property_type.length != 0) ||
    (code_las_vegas.includes(postal_input) &&
      !location_input.includes("las vegas") &&
      property_type.length != 0) ||
    (code_laughlin.includes(postal_input) &&
      !location_input.includes("laughlin") &&
      property_type.length != 0) ||
    (code_logandale.includes(postal_input) &&
      !location_input.includes("logandale") &&
      property_type.length != 0) ||
    (code_mesquite.includes(postal_input) &&
      !location_input.includes("mesquite") &&
      property_type.length != 0) ||
    (code_moapa.includes(postal_input) &&
      !location_input.includes("moapa") &&
      property_type.length != 0) ||
    (code_nellis_afb.includes(postal_input) &&
      !location_input.includes("nellis afb") &&
      property_type.length != 0) ||
    (code_nellis_afb.includes(postal_input) &&
      !location_input.includes("nellis air force base") &&
      property_type.length != 0) ||
    (code_north_las_vegas.includes(postal_input) &&
      !location_input.includes("north las vegas") &&
      property_type.length != 0) ||
    (code_overton.includes(postal_input) &&
      !location_input.includes("overton") &&
      property_type.length != 0) ||
    (code_searchlight.includes(postal_input) &&
      !location_input.includes("searchlight") &&
      property_type.length != 0) ||
    (code_sloan.includes(postal_input) &&
      !location_input.includes("sloan") &&
      property_type.length != 0) ||
    (code_the_lakes.includes(postal_input) &&
      !location_input.includes("the lakes") &&
      property_type.length != 0) ||
    (code_accokeek.includes(postal_input) &&
      !location_input.includes("accokeek") &&
      property_type.length != 0) ||
    (code_andrews_air_force_base.includes(postal_input) &&
      !location_input.includes("andrews air force base") &&
      property_type.length != 0) ||
    (code_andrews_air_force_base.includes(postal_input) &&
      !location_input.includes("andrews afb") &&
      property_type.length != 0) ||
    (code_annapolis.includes(postal_input) &&
      !location_input.includes("annapolis") &&
      property_type.length != 0) ||
    (code_annapolis_junction.includes(postal_input) &&
      !location_input.includes("annapolis junction") &&
      property_type.length != 0) ||
    (code_aquasco.includes(postal_input) &&
      !location_input.includes("aquasco") &&
      property_type.length != 0) ||
    (code_arnold.includes(postal_input) &&
      !location_input.includes("arnold") &&
      property_type.length != 0) ||
    (code_ashton.includes(postal_input) &&
      !location_input.includes("ashton") &&
      property_type.length != 0) ||
    (code_baltimore.includes(postal_input) &&
      !location_input.includes("baltimore") &&
      property_type.length != 0) ||
    (code_barnesville.includes(postal_input) &&
      !location_input.includes("barnesville") &&
      property_type.length != 0) ||
    (code_beallsville.includes(postal_input) &&
      !location_input.includes("beallsville") &&
      property_type.length != 0) ||
    (code_beltsville.includes(postal_input) &&
      !location_input.includes("beltsville") &&
      property_type.length != 0) ||
    (code_bethesda.includes(postal_input) &&
      !location_input.includes("bethesda") &&
      property_type.length != 0) ||
    (code_bladensburg.includes(postal_input) &&
      !location_input.includes("bladensburg") &&
      property_type.length != 0) ||
    (code_bowie.includes(postal_input) &&
      !location_input.includes("bowie") &&
      property_type.length != 0) ||
    (code_boyds.includes(postal_input) &&
      !location_input.includes("boyds") &&
      property_type.length != 0) ||
    (code_brandywine.includes(postal_input) &&
      !location_input.includes("brandywine") &&
      property_type.length != 0) ||
    (code_brentwood.includes(postal_input) &&
      !location_input.includes("brentwood") &&
      property_type.length != 0) ||
    (code_brinklow.includes(postal_input) &&
      !location_input.includes("brinklow") &&
      property_type.length != 0) ||
    (code_brookeville.includes(postal_input) &&
      !location_input.includes("brookeville") &&
      property_type.length != 0) ||
    (code_burtonsville.includes(postal_input) &&
      !location_input.includes("burtonsville") &&
      property_type.length != 0) ||
    (code_cabin_john.includes(postal_input) &&
      !location_input.includes("cabin john") &&
      property_type.length != 0) ||
    (code_capitol_heights.includes(postal_input) &&
      !location_input.includes("capitol heights") &&
      property_type.length != 0) ||
    (code_cheltenham.includes(postal_input) &&
      !location_input.includes("cheltenham") &&
      property_type.length != 0) ||
    (code_chevy_chase.includes(postal_input) &&
      !location_input.includes("chevy chase") &&
      property_type.length != 0) ||
    (code_churchton.includes(postal_input) &&
      !location_input.includes("churchton") &&
      property_type.length != 0) ||
    (code_clarksburg.includes(postal_input) &&
      !location_input.includes("clarksburg") &&
      property_type.length != 0) ||
    (code_clarksville.includes(postal_input) &&
      !location_input.includes("clarksville") &&
      property_type.length != 0) ||
    (code_clinton.includes(postal_input) &&
      !location_input.includes("clinton") &&
      property_type.length != 0) ||
    (code_college_park.includes(postal_input) &&
      !location_input.includes("college park") &&
      property_type.length != 0) ||
    (code_columbia.includes(postal_input) &&
      !location_input.includes("columbia") &&
      property_type.length != 0) ||
    (code_cooksville.includes(postal_input) &&
      !location_input.includes("cooksville") &&
      property_type.length != 0) ||
    (code_crofton.includes(postal_input) &&
      !location_input.includes("crofton") &&
      property_type.length != 0) ||
    (code_crownsville.includes(postal_input) &&
      !location_input.includes("crownsville") &&
      property_type.length != 0) ||
    (code_curtis_bay.includes(postal_input) &&
      !location_input.includes("curtis bay") &&
      property_type.length != 0) ||
    (code_damascus.includes(postal_input) &&
      !location_input.includes("damascus") &&
      property_type.length != 0) ||
    (code_davidsonville.includes(postal_input) &&
      !location_input.includes("davidsonville") &&
      property_type.length != 0) ||
    (code_dayton.includes(postal_input) &&
      !location_input.includes("dayton") &&
      property_type.length != 0) ||
    (code_deale.includes(postal_input) &&
      !location_input.includes("deale") &&
      property_type.length != 0) ||
    (code_derwood.includes(postal_input) &&
      !location_input.includes("derwood") &&
      property_type.length != 0) ||
    (code_dickerson.includes(postal_input) &&
      !location_input.includes("dickerson") &&
      property_type.length != 0) ||
    (code_district_heights.includes(postal_input) &&
      !location_input.includes("district heights") &&
      property_type.length != 0) ||
    (code_edgewater.includes(postal_input) &&
      !location_input.includes("edgewater") &&
      property_type.length != 0) ||
    (code_elkridge.includes(postal_input) &&
      !location_input.includes("elkridge") &&
      property_type.length != 0) ||
    (code_ellicott_city.includes(postal_input) &&
      !location_input.includes("ellicott") &&
      property_type.length != 0) ||
    (code_fort_george.includes(postal_input) &&
      !location_input.includes("fort george") &&
      property_type.length != 0) ||
    (code_fort_washington.includes(postal_input) &&
      !location_input.includes("fort washington") &&
      property_type.length != 0) ||
    (code_friendship.includes(postal_input) &&
      !location_input.includes("friendship") &&
      property_type.length != 0) ||
    (code_fulton.includes(postal_input) &&
      !location_input.includes("fulton") &&
      property_type.length != 0) ||
    (code_gaithersburg.includes(postal_input) &&
      !location_input.includes("gaithersburg") &&
      property_type.length != 0) ||
    (code_galesville.includes(postal_input) &&
      !location_input.includes("galesville") &&
      property_type.length != 0) ||
    (code_gambrills.includes(postal_input) &&
      !location_input.includes("gambrills") &&
      property_type.length != 0) ||
    (code_garrett_park.includes(postal_input) &&
      !location_input.includes("garrett park") &&
      property_type.length != 0) ||
    (code_germantown.includes(postal_input) &&
      !location_input.includes("germantown") &&
      property_type.length != 0) ||
    (code_gibson_island.includes(postal_input) &&
      !location_input.includes("gibson island") &&
      property_type.length != 0) ||
    (code_glen_burnie.includes(postal_input) &&
      !location_input.includes("glen burnie") &&
      property_type.length != 0) ||
    (code_glen_echo.includes(postal_input) &&
      !location_input.includes("glen echo") &&
      property_type.length != 0) ||
    (code_glenelg.includes(postal_input) &&
      !location_input.includes("glenelg") &&
      property_type.length != 0) ||
    (code_glenn_dale.includes(postal_input) &&
      !location_input.includes("glenn dale") &&
      property_type.length != 0) ||
    (code_glenwood.includes(postal_input) &&
      !location_input.includes("glenwood") &&
      property_type.length != 0) ||
    (code_greenbelt.includes(postal_input) &&
      !location_input.includes("greenbelt") &&
      property_type.length != 0) ||
    (code_hanover.includes(postal_input) &&
      !location_input.includes("hanover") &&
      property_type.length != 0) ||
    (code_harmans.includes(postal_input) &&
      !location_input.includes("harmans") &&
      property_type.length != 0) ||
    (code_harwood.includes(postal_input) &&
      !location_input.includes("harwood") &&
      property_type.length != 0) ||
    (code_highland.includes(postal_input) &&
      !location_input.includes("highland") &&
      property_type.length != 0) ||
    (code_hyattsville.includes(postal_input) &&
      !location_input.includes("hyattsville") &&
      property_type.length != 0) ||
    (code_jessup.includes(postal_input) &&
      !location_input.includes("jessup") &&
      property_type.length != 0) ||
    (code_kensington.includes(postal_input) &&
      !location_input.includes("kensington") &&
      property_type.length != 0) ||
    (code_lanham.includes(postal_input) &&
      !location_input.includes("lanham") &&
      property_type.length != 0) ||
    (code_laurel.includes(postal_input) &&
      !location_input.includes("laurel") &&
      property_type.length != 0) ||
    (code_linthicum_heights.includes(postal_input) &&
      !location_input.includes("linthicum heights") &&
      property_type.length != 0) ||
    (code_lisbon.includes(postal_input) &&
      !location_input.includes("lisbon") &&
      property_type.length != 0) ||
    (code_mayo.includes(postal_input) &&
      !location_input.includes("mayo") &&
      property_type.length != 0) ||
    (code_millersville.includes(postal_input) &&
      !location_input.includes("millersville") &&
      property_type.length != 0) ||
    (code_montgomery_village.includes(postal_input) &&
      !location_input.includes("montgomery village") &&
      property_type.length != 0) ||
    (code_mount_rainier.includes(postal_input) &&
      !location_input.includes("mount rainier") &&
      property_type.length != 0) ||
    (code_odenton.includes(postal_input) &&
      !location_input.includes("odenton") &&
      property_type.length != 0) ||
    (code_olney.includes(postal_input) &&
      !location_input.includes("olney") &&
      property_type.length != 0) ||
    (code_oxon_hill.includes(postal_input) &&
      !location_input.includes("oxon hill") &&
      property_type.length != 0) ||
    (code_poolesville.includes(postal_input) &&
      !location_input.includes("poolesville") &&
      property_type.length != 0) ||
    (code_potomac.includes(postal_input) &&
      !location_input.includes("potomac") &&
      property_type.length != 0) ||
    (code_riva.includes(postal_input) &&
      !location_input.includes("riva") &&
      property_type.length != 0) ||
    (code_riverdale.includes(postal_input) &&
      !location_input.includes("riverdale") &&
      property_type.length != 0) ||
    (code_rockville.includes(postal_input) &&
      !location_input.includes("rockville") &&
      property_type.length != 0) ||
    (code_sandy_spring.includes(postal_input) &&
      !location_input.includes("sandy spring") &&
      property_type.length != 0) ||
    (code_savage.includes(postal_input) &&
      !location_input.includes("savage") &&
      property_type.length != 0) ||
    (code_severn.includes(postal_input) &&
      !location_input.includes("severn") &&
      property_type.length != 0) ||
    (code_severna_park.includes(postal_input) &&
      !location_input.includes("severna park") &&
      property_type.length != 0) ||
    (code_shady_side.includes(postal_input) &&
      !location_input.includes("shady side") &&
      property_type.length != 0) ||
    (code_silver_spring.includes(postal_input) &&
      !location_input.includes("silver spring") &&
      property_type.length != 0) ||
    (code_simpsonville.includes(postal_input) &&
      !location_input.includes("simpsonville") &&
      property_type.length != 0) ||
    (code_spencerville.includes(postal_input) &&
      !location_input.includes("spencerville") &&
      property_type.length != 0) ||
    (code_suitland.includes(postal_input) &&
      !location_input.includes("suitland") &&
      property_type.length != 0) ||
    (code_takoma_park.includes(postal_input) &&
      !location_input.includes("takoma park") &&
      property_type.length != 0) ||
    (code_temple_hills.includes(postal_input) &&
      !location_input.includes("temple hills") &&
      property_type.length != 0) ||
    (code_tracys_landing.includes(postal_input) &&
      !location_input.includes("tracys landing") &&
      property_type.length != 0) ||
    (code_upper_marlboro.includes(postal_input) &&
      !location_input.includes("upper marlboro") &&
      property_type.length != 0) ||
    (code_washington_grove.includes(postal_input) &&
      !location_input.includes("washington grove") &&
      property_type.length != 0) ||
    (code_west_friendship.includes(postal_input) &&
      !location_input.includes("west friendship") &&
      property_type.length != 0) ||
    (code_west_river.includes(postal_input) &&
      !location_input.includes("west river") &&
      property_type.length != 0) ||
    (code_woodbine.includes(postal_input) &&
      !location_input.includes("woodbine") &&
      property_type.length != 0) ||
    (code_woodstock.includes(postal_input) &&
      !location_input.includes("woodstock") &&
      property_type.length != 0) ||
    // RAVE
    (code_austin.includes(postal_input) &&
      !location_input.includes("austin") &&
      property_type.length != 0) ||
    (code_bastrop.includes(postal_input) &&
      !location_input.includes("bastrop") &&
      property_type.length != 0) ||
    (code_buda.includes(postal_input) &&
      !location_input.includes("buda") &&
      property_type.length != 0) ||
    (code_cedar_creek.includes(postal_input) &&
      !location_input.includes("cedar creek") &&
      property_type.length != 0) ||
    (code_cedar_park.includes(postal_input) &&
      !location_input.includes("cedar park") &&
      property_type.length != 0) ||
    (code_corpus_christi.includes(postal_input) &&
      !location_input.includes("corpus christi") &&
      property_type.length != 0) ||
    (code_coupland.includes(postal_input) &&
      !location_input.includes("coupland") &&
      property_type.length != 0) ||
    (code_del_valle.includes(postal_input) &&
      !location_input.includes("del valle") &&
      property_type.length != 0) ||
    (code_dripping_srpings.includes(postal_input) &&
      !location_input.includes("dripping springs") &&
      property_type.length != 0) ||
    (code_elgin.includes(postal_input) &&
      !location_input.includes("elgin") &&
      property_type.length != 0) ||
    (code_florence.includes(postal_input) &&
      !location_input.includes("florence") &&
      property_type.length != 0) ||
    (code_georgetown.includes(postal_input) &&
      !location_input.includes("georgetown") &&
      property_type.length != 0) ||
    (code_harker_heights.includes(postal_input) &&
      !location_input.includes("harker heights") &&
      property_type.length != 0) ||
    (code_hutto.includes(postal_input) &&
      !location_input.includes("hutto") &&
      property_type.length != 0) ||
    (code_jarrell.includes(postal_input) &&
      !location_input.includes("jarrell") &&
      property_type.length != 0) ||
    (code_killeen.includes(postal_input) &&
      !location_input.includes("killeen") &&
      property_type.length != 0) ||
    (code_kyle.includes(postal_input) &&
      !location_input.includes("kyle") &&
      property_type.length != 0) ||
    (code_leander.includes(postal_input) &&
      !location_input.includes("leander") &&
      property_type.length != 0) ||
    (code_liberty_hill.includes(postal_input) &&
      !location_input.includes("liberty hill") &&
      property_type.length != 0) ||
    (code_manchaca.includes(postal_input) &&
      !location_input.includes("manchaca") &&
      property_type.length != 0) ||
    (code_manor.includes(postal_input) &&
      !location_input.includes("manor") &&
      property_type.length != 0) ||
    (code_pflugerville.includes(postal_input) &&
      !location_input.includes("pflugerville") &&
      property_type.length != 0) ||
    (code_roundrock.includes(postal_input) &&
      !location_input.includes("round rock") &&
      property_type.length != 0) ||
    (code_salado.includes(postal_input) &&
      !location_input.includes("salado") &&
      property_type.length != 0) ||
    (code_taylor.includes(postal_input) &&
      !location_input.includes("taylor") &&
      property_type.length != 0) ||
    (code_temple.includes(postal_input) &&
      !location_input.includes("temple") &&
      property_type.length != 0) ||
    // COMPLETE
    (code_alief.includes(postal_input) &&
      !location_input.includes("alief") &&
      property_type.length != 0) ||
    (code_alvin.includes(postal_input) &&
      !location_input.includes("alvin") &&
      property_type.length != 0) ||
    (code_angleton.includes(postal_input) &&
      !location_input.includes("angleton") &&
      property_type.length != 0) ||
    (code_bacliff.includes(postal_input) &&
      !location_input.includes("bacliff") &&
      property_type.length != 0) ||
    (code_barker.includes(postal_input) &&
      !location_input.includes("barker") &&
      property_type.length != 0) ||
    (code_baytown.includes(postal_input) &&
      !location_input.includes("baytown") &&
      property_type.length != 0) ||
    (code_bellaire.includes(postal_input) &&
      !location_input.includes("bellaire") &&
      property_type.length != 0) ||
    (code_channelview.includes(postal_input) &&
      !location_input.includes("channelview") &&
      property_type.length != 0) ||
    (code_conroe.includes(postal_input) &&
      !location_input.includes("conroe") &&
      property_type.length != 0) ||
    (code_crosby.includes(postal_input) &&
      !location_input.includes("crosby") &&
      property_type.length != 0) ||
    (code_cypress.includes(postal_input) &&
      !location_input.includes("cypress") &&
      property_type.length != 0) ||
    (code_deer_park.includes(postal_input) &&
      !location_input.includes("deer park") &&
      property_type.length != 0) ||
    (code_dickinson.includes(postal_input) &&
      !location_input.includes("dickinson") &&
      property_type.length != 0) ||
    (code_freeport.includes(postal_input) &&
      !location_input.includes("freeport") &&
      property_type.length != 0) ||
    (code_fresno.includes(postal_input) &&
      !location_input.includes("fresno") &&
      property_type.length != 0) ||
    (code_friendswood.includes(postal_input) &&
      !location_input.includes("friendswood") &&
      property_type.length != 0) ||
    (code_gelena_park.includes(postal_input) &&
      !location_input.includes("gelena park") &&
      property_type.length != 0) ||
    (code_hempstead.includes(postal_input) &&
      !location_input.includes("hempstead") &&
      property_type.length != 0) ||
    (code_highlands.includes(postal_input) &&
      !location_input.includes("highlands") &&
      property_type.length != 0) ||
    (code_hitchcock.includes(postal_input) &&
      !location_input.includes("hitchcock") &&
      property_type.length != 0) ||
    (code_houston.includes(postal_input) &&
      !location_input.includes("houston") &&
      property_type.length != 0) ||
    (code_huffman.includes(postal_input) &&
      !location_input.includes("huffman") &&
      property_type.length != 0) ||
    (code_humble.includes(postal_input) &&
      !location_input.includes("humble") &&
      property_type.length != 0) ||
    (code_katy.includes(postal_input) &&
      !location_input.includes("katy") &&
      property_type.length != 0) ||
    (code_kemah.includes(postal_input) &&
      !location_input.includes("kemah") &&
      property_type.length != 0) ||
    (code_kingwood.includes(postal_input) &&
      !location_input.includes("kingwood") &&
      property_type.length != 0) ||
    (code_la_marque.includes(postal_input) &&
      !location_input.includes("la marque") &&
      property_type.length != 0) ||
    (code_la_porte.includes(postal_input) &&
      !location_input.includes("la porte") &&
      property_type.length != 0) ||
    (code_league_city.includes(postal_input) &&
      !location_input.includes("league city") &&
      property_type.length != 0) ||
    (code_liverpool.includes(postal_input) &&
      !location_input.includes("liverpool") &&
      property_type.length != 0) ||
    (code_manvel.includes(postal_input) &&
      !location_input.includes("manvel") &&
      property_type.length != 0) ||
    (code_missouri_city.includes(postal_input) &&
      !location_input.includes("missouri") &&
      property_type.length != 0) ||
    (code_north_houston.includes(postal_input) &&
      !location_input.includes("north houston") &&
      property_type.length != 0) ||
    (code_pearland.includes(postal_input) &&
      !location_input.includes("pearland") &&
      property_type.length != 0) ||
    (code_porter.includes(postal_input) &&
      !location_input.includes("porter") &&
      property_type.length != 0) ||
    (code_rosenberg.includes(postal_input) &&
      !location_input.includes("rosenberg") &&
      property_type.length != 0) ||
    (code_rosharon.includes(postal_input) &&
      !location_input.includes("rosharon") &&
      property_type.length != 0) ||
    (code_santa_fe.includes(postal_input) &&
      !location_input.includes("santa fe") &&
      property_type.length != 0) ||
    (code_seabrook.includes(postal_input) &&
      !location_input.includes("seabrook") &&
      property_type.length != 0) ||
    (code_south_houston.includes(postal_input) &&
      !location_input.includes("south houston") &&
      property_type.length != 0) ||
    (code_spring.includes(postal_input) &&
      !location_input.includes("spring") &&
      property_type.length != 0) ||
    (code_stafford.includes(postal_input) &&
      !location_input.includes("stafford") &&
      property_type.length != 0) ||
    (code_sugar_land.includes(postal_input) &&
      !location_input.includes("sugar land") &&
      property_type.length != 0) ||
    (code_texas_city.includes(postal_input) &&
      !location_input.includes("texas") &&
      property_type.length != 0) ||
    (code_thompsons.includes(postal_input) &&
      !location_input.includes("thompsons") &&
      property_type.length != 0) ||
    (code_tomball.includes(postal_input) &&
      !location_input.includes("tomball") &&
      property_type.length != 0) ||
    (code_waller.includes(postal_input) &&
      !location_input.includes("waller") &&
      property_type.length != 0) ||
    (code_webster.includes(postal_input) &&
      !location_input.includes("webster") &&
      property_type.length != 0) ||
    (code_west_columbia.includes(postal_input) &&
      !location_input.includes("west columbia") &&
      property_type.length != 0) ||
    // CREEKBEND
    (code_charleston.includes(postal_input) &&
      !location_input.includes("charleston") &&
      property_type.length != 0) ||
    (code_folly_beach.includes(postal_input) &&
      !location_input.includes("folly beach") &&
      property_type.length != 0) ||
    (code_goose_creek.includes(postal_input) &&
      !location_input.includes("goose creek") &&
      property_type.length != 0) ||
    (code_hanahan.includes(postal_input) &&
      !location_input.includes("hanahan") &&
      property_type.length != 0) ||
    (code_isle_of_palms.includes(postal_input) &&
      !location_input.includes("isle of palms") &&
      property_type.length != 0) ||
    (code_isle_of_palms.includes(postal_input) &&
      !location_input.includes("palms isle") &&
      property_type.length != 0) ||
    (code_johns_island.includes(postal_input) &&
      !location_input.includes("johns island") &&
      property_type.length != 0) ||
    (code_ladson.includes(postal_input) &&
      !location_input.includes("ladson") &&
      property_type.length != 0) ||
    (code_moncks_corner.includes(postal_input) &&
      !location_input.includes("moncks corner") &&
      property_type.length != 0) ||
    (code_mount_pleasant.includes(postal_input) &&
      !location_input.includes("mount pleasant") &&
      property_type.length != 0) ||
    (code_mount_pleasant.includes(postal_input) &&
      !location_input.includes("mt. pleasant") &&
      property_type.length != 0) ||
    (code_north_charleston.includes(postal_input) &&
      !location_input.includes("north charleston") &&
      property_type.length != 0) ||
    (code_sullivan_island.includes(postal_input) &&
      !location_input.includes("sullivans island") &&
      property_type.length != 0) ||
    (code_summerville.includes(postal_input) &&
      !location_input.includes("summerville") &&
      property_type.length != 0) ||
    // RADIUS
    (code_annada.includes(postal_input) &&
      !location_input.includes("annada") &&
      property_type.length != 0) ||
    (code_augusta.includes(postal_input) &&
      !location_input.includes("augusta") &&
      property_type.length != 0) ||
    (code_ballwin.includes(postal_input) &&
      !location_input.includes("ballwin") &&
      property_type.length != 0) ||
    (code_barnhart.includes(postal_input) &&
      !location_input.includes("barnhart") &&
      property_type.length != 0) ||
    (code_beaufort.includes(postal_input) &&
      !location_input.includes("beaufort") &&
      property_type.length != 0) ||
    (code_bridgeton.includes(postal_input) &&
      !location_input.includes("bridgeton") &&
      property_type.length != 0) ||
    (code_catawissa.includes(postal_input) &&
      !location_input.includes("catawissa") &&
      property_type.length != 0) ||
    (code_cedar_hill.includes(postal_input) &&
      !location_input.includes("cedar hill") &&
      property_type.length != 0) ||
    (code_chesterfield.includes(postal_input) &&
      !location_input.includes("chesterfield") &&
      property_type.length != 0) ||
    (code_crystal_city.includes(postal_input) &&
      !location_input.includes("crystal") &&
      property_type.length != 0) ||
    (code_de_soto.includes(postal_input) &&
      !location_input.includes("de soto") &&
      property_type.length != 0) ||
    (code_defiance.includes(postal_input) &&
      !location_input.includes("defiance") &&
      property_type.length != 0) ||
    (code_dittmer.includes(postal_input) &&
      !location_input.includes("dittmer") &&
      property_type.length != 0) ||
    (code_dutzow.includes(postal_input) &&
      !location_input.includes("dutzow") &&
      property_type.length != 0) ||
    (code_earth_city.includes(postal_input) &&
      !location_input.includes("earth city") &&
      property_type.length != 0) ||
    (code_elsberry.includes(postal_input) &&
      !location_input.includes("elsberry") &&
      property_type.length != 0) ||
    (code_eolia.includes(postal_input) &&
      !location_input.includes("eolia") &&
      property_type.length != 0) ||
    (code_eureka.includes(postal_input) &&
      !location_input.includes("eureka") &&
      property_type.length != 0) ||
    (code_fenton.includes(postal_input) &&
      !location_input.includes("fenton") &&
      property_type.length != 0) ||
    (code_festus.includes(postal_input) &&
      !location_input.includes("festus") &&
      property_type.length != 0) ||
    (code_fletcher.includes(postal_input) &&
      !location_input.includes("fletcher") &&
      property_type.length != 0) ||
    (code_flinthill.includes(postal_input) &&
      !location_input.includes("flinthill") &&
      property_type.length != 0) ||
    (code_florissant.includes(postal_input) &&
      !location_input.includes("florissant") &&
      property_type.length != 0) ||
    (code_foley.includes(postal_input) &&
      !location_input.includes("foley") &&
      property_type.length != 0) ||
    (code_foristell.includes(postal_input) &&
      !location_input.includes("foristell") &&
      property_type.length != 0) ||
    (code_french_village.includes(postal_input) &&
      !location_input.includes("french village") &&
      property_type.length != 0) ||
    (code_gerald.includes(postal_input) &&
      !location_input.includes("gerald") &&
      property_type.length != 0) ||
    (code_glencoe.includes(postal_input) &&
      !location_input.includes("glencoe") &&
      property_type.length != 0) ||
    (code_gray_summit.includes(postal_input) &&
      !location_input.includes("gray summit") &&
      property_type.length != 0) ||
    (code_grover.includes(postal_input) &&
      !location_input.includes("grover") &&
      property_type.length != 0) ||
    (code_grubville.includes(postal_input) &&
      !location_input.includes("grubville") &&
      property_type.length != 0) ||
    (code_hawk_point.includes(postal_input) &&
      !location_input.includes("hawk point") &&
      property_type.length != 0) ||
    (code_hazelwood.includes(postal_input) &&
      !location_input.includes("hazelwood") &&
      property_type.length != 0) ||
    (code_herculaneum.includes(postal_input) &&
      !location_input.includes("herculaneum") &&
      property_type.length != 0) ||
    (code_high_hill.includes(postal_input) &&
      !location_input.includes("high hill") &&
      property_type.length != 0) ||
    (code_high_ridge.includes(postal_input) &&
      !location_input.includes("high ridge") &&
      property_type.length != 0) ||
    (code_hillsboro.includes(postal_input) &&
      !location_input.includes("hillsboro") &&
      property_type.length != 0) ||
    (code_house_springs.includes(postal_input) &&
      !location_input.includes("house springs") &&
      property_type.length != 0) ||
    (code_imperial.includes(postal_input) &&
      !location_input.includes("imperial") &&
      property_type.length != 0) ||
    (code_jonesburg.includes(postal_input) &&
      !location_input.includes("jonesburg") &&
      property_type.length != 0) ||
    (code_kimmswick.includes(postal_input) &&
      !location_input.includes("kimmswick") &&
      property_type.length != 0) ||
    (code_labadie.includes(postal_input) &&
      !location_input.includes("labadie") &&
      property_type.length != 0) ||
    (code_lake_saint_louis.includes(postal_input) &&
      !location_input.includes("lake saint louis") &&
      property_type.length != 0) ||
    (code_leslie.includes(postal_input) &&
      !location_input.includes("leslie") &&
      property_type.length != 0) ||
    (code_liguori.includes(postal_input) &&
      !location_input.includes("liguori") &&
      property_type.length != 0) ||
    (code_lonedell.includes(postal_input) &&
      !location_input.includes("lonedell") &&
      property_type.length != 0) ||
    (code_luebbering.includes(postal_input) &&
      !location_input.includes("luebbering") &&
      property_type.length != 0) ||
    (code_mapaville.includes(postal_input) &&
      !location_input.includes("mapaville") &&
      property_type.length != 0) ||
    (code_marthasville.includes(postal_input) &&
      !location_input.includes("marthasville") &&
      property_type.length != 0) ||
    (code_maryland_heights.includes(postal_input) &&
      !location_input.includes("maryland heights") &&
      property_type.length != 0) ||
    (code_montgomery_city.includes(postal_input) &&
      !location_input.includes("montgomery") &&
      property_type.length != 0) ||
    (code_moscow_mills.includes(postal_input) &&
      !location_input.includes("moscow mills") &&
      property_type.length != 0) ||
    (code_new_florence.includes(postal_input) &&
      !location_input.includes("new florence") &&
      property_type.length != 0) ||
    (code_new_haven.includes(postal_input) &&
      !location_input.includes("new haven") &&
      property_type.length != 0) ||
    (code_new_melle.includes(postal_input) &&
      !location_input.includes("new melle") &&
      property_type.length != 0) ||
    (code_o_fallon.includes(postal_input) &&
      !location_input.includes("o'fallon") &&
      property_type.length != 0) ||
    (code_old_monroe.includes(postal_input) &&
      !location_input.includes("old monroe") &&
      property_type.length != 0) ||
    (code_pacific.includes(postal_input) &&
      !location_input.includes("pacific") &&
      property_type.length != 0) ||
    (code_pevely.includes(postal_input) &&
      !location_input.includes("pevely") &&
      property_type.length != 0) ||
    (code_portage_des_sioux.includes(postal_input) &&
      !location_input.includes("portage des sioux") &&
      property_type.length != 0) ||
    (code_richwoods.includes(postal_input) &&
      !location_input.includes("richwoods") &&
      property_type.length != 0) ||
    (code_robertsville.includes(postal_input) &&
      !location_input.includes("robertsville") &&
      property_type.length != 0) ||
    (code_saint_albans.includes(postal_input) &&
      !location_input.includes("saint albans") &&
      property_type.length != 0) ||
    (code_saint_albans.includes(postal_input) &&
      !location_input.includes("st. albans") &&
      property_type.length != 0) ||
    (code_saint_ann.includes(postal_input) &&
      !location_input.includes("saint ann") &&
      property_type.length != 0) ||
    (code_saint_ann.includes(postal_input) &&
      !location_input.includes("st. ann") &&
      property_type.length != 0) ||
    (code_saint_charles.includes(postal_input) &&
      !location_input.includes("saint charles") &&
      property_type.length != 0) ||
    (code_saint_charles.includes(postal_input) &&
      !location_input.includes("st. charles") &&
      property_type.length != 0) ||
    (code_saint_clair.includes(postal_input) &&
      !location_input.includes("saint clair") &&
      property_type.length != 0) ||
    (code_saint_clair.includes(postal_input) &&
      !location_input.includes("st. claire") &&
      property_type.length != 0) ||
    (code_saint_louis.includes(postal_input) &&
      !location_input.includes("saint louis") &&
      property_type.length != 0) ||
    (code_saint_louis.includes(postal_input) &&
      !location_input.includes("st. louis") &&
      property_type.length != 0) ||
    (code_saint_peters.includes(postal_input) &&
      !location_input.includes("saint peters") &&
      property_type.length != 0) ||
    (code_saint_peters.includes(postal_input) &&
      !location_input.includes("st. peters") &&
      property_type.length != 0) ||
    (code_silex.includes(postal_input) &&
      !location_input.includes("silex") &&
      property_type.length != 0) ||
    (code_stanton.includes(postal_input) &&
      !location_input.includes("stanton") &&
      property_type.length != 0) ||
    (code_sullivan.includes(postal_input) &&
      !location_input.includes("sullivan") &&
      property_type.length != 0) ||
    (code_troy.includes(postal_input) &&
      !location_input.includes("troy") &&
      property_type.length != 0) ||
    (code_truxton.includes(postal_input) &&
      !location_input.includes("truxton") &&
      property_type.length != 0) ||
    (code_union.includes(postal_input) &&
      !location_input.includes("union") &&
      property_type.length != 0) ||
    (code_valles_mines.includes(postal_input) &&
      !location_input.includes("valles mines") &&
      property_type.length != 0) ||
    (code_valley_park.includes(postal_input) &&
      !location_input.includes("valley park") &&
      property_type.length != 0) ||
    (code_villa_ridge.includes(postal_input) &&
      !location_input.includes("villa ridge") &&
      property_type.length != 0) ||
    (code_warrenton.includes(postal_input) &&
      !location_input.includes("warrenton") &&
      property_type.length != 0) ||
    (code_washington.includes(postal_input) &&
      !location_input.includes("washington") &&
      property_type.length != 0) ||
    (code_wentzville.includes(postal_input) &&
      !location_input.includes("wentzville") &&
      property_type.length != 0) ||
    (code_west_alton.includes(postal_input) &&
      !location_input.includes("west alton") &&
      property_type.length != 0) ||
    (code_whiteside.includes(postal_input) &&
      !location_input.includes("whiteside") &&
      property_type.length != 0) ||
    (code_winfield.includes(postal_input) &&
      !location_input.includes("winfield") &&
      property_type.length != 0) ||
    (code_wright_city.includes(postal_input) &&
      !location_input.includes("wright city") &&
      property_type.length != 0) ||
    //rentsafe
    (code_apex.includes(postal_input) &&
      !location_input.includes("apex") &&
      property_type.length != 0) ||
    (code_cary.includes(postal_input) &&
      !location_input.includes("cary") &&
      property_type.length != 0) ||
    (code_chapel_hill.includes(postal_input) &&
      !location_input.includes("chapel hill") &&
      property_type.length != 0) ||
    (code_clayton.includes(postal_input) &&
      !location_input.includes("clayton") &&
      property_type.length != 0) ||
    (code_durham.includes(postal_input) &&
      !location_input.includes("durham") &&
      property_type.length != 0) ||
    (code_fuquay_varina.includes(postal_input) &&
      !location_input.includes("fuquay varina") &&
      property_type.length != 0) ||
    (code_fuquay_varina.includes(postal_input) &&
      !location_input.includes("fuquay-varina") &&
      property_type.length != 0) ||
    (code_garner.includes(postal_input) &&
      !location_input.includes("garner") &&
      property_type.length != 0) ||
    (code_holly_springs.includes(postal_input) &&
      !location_input.includes("holly springs") &&
      property_type.length != 0) ||
    (code_knightdale.includes(postal_input) &&
      !location_input.includes("knightdale") &&
      property_type.length != 0) ||
    (code_moncure.includes(postal_input) &&
      !location_input.includes("moncure") &&
      property_type.length != 0) ||
    (code_morrisville.includes(postal_input) &&
      !location_input.includes("morrisville") &&
      property_type.length != 0) ||
    (code_new_hill.includes(postal_input) &&
      !location_input.includes("new hill") &&
      property_type.length != 0) ||
    (code_raleigh.includes(postal_input) &&
      !location_input.includes("raleigh") &&
      property_type.length != 0) ||
    (code_rolesville.includes(postal_input) &&
      !location_input.includes("rolesville") &&
      property_type.length != 0) ||
    (code_wake_forest.includes(postal_input) &&
      !location_input.includes("wake forest") &&
      property_type.length != 0) ||
    (code_wendell.includes(postal_input) &&
      !location_input.includes("wendell") &&
      property_type.length != 0) ||
    (code_willow_spring.includes(postal_input) &&
      !location_input.includes("willow spring") &&
      property_type.length != 0) ||
    (code_zebulon.includes(postal_input) &&
      !location_input.includes("zebulon") &&
      property_type.length != 0) ||
    // Major
    (!code_portland.includes(postal_input) &&
      location_input.includes("portland") &&
      property_type.length != 0) ||
    (!code_eugene.includes(postal_input) &&
      location_input.includes("eugene") &&
      property_type.length != 0) ||
    (!code_nashville.includes(postal_input) &&
      location_input.includes("nashville") &&
      property_type.length != 0) ||
    (!code_antelope.includes(postal_input) &&
      location_input.includes("antelope") &&
      property_type.length != 0) ||
    (!code_carmichael.includes(postal_input) &&
      location_input.includes("carmichael") &&
      property_type.length != 0) ||
    (!code_citrus_heights.includes(postal_input) &&
      location_input.includes("citrus heights") &&
      property_type.length != 0) ||
    (!code_clarksburg.includes(postal_input) &&
      location_input.includes("clarksburg") &&
      property_type.length != 0) ||
    (!code_davis.includes(postal_input) &&
      location_input.includes("davis") &&
      property_type.length != 0) ||
    (!code_el_dorado_hills.includes(postal_input) &&
      location_input.includes("el dorado") &&
      property_type.length != 0) ||
    (!code_elk_grove.includes(postal_input) &&
      location_input.includes("elk grove") &&
      property_type.length != 0) ||
    (!code_elverta.includes(postal_input) &&
      location_input.includes("elverta") &&
      property_type.length != 0) ||
    (!code_fair_oaks.includes(postal_input) &&
      location_input.includes("fair oaks") &&
      property_type.length != 0) ||
    (!code_folsom.includes(postal_input) &&
      location_input.includes("folsom") &&
      property_type.length != 0) ||
    (!code_granite_bay.includes(postal_input) &&
      location_input.includes("granite bay") &&
      property_type.length != 0) ||
    (!code_hood.includes(postal_input) &&
      location_input.includes("hood") &&
      property_type.length != 0) ||
    (!code_mather.includes(postal_input) &&
      location_input.includes("mather") &&
      property_type.length != 0) ||
    (!code_mcclellan.includes(postal_input) &&
      location_input.includes("mcclellan") &&
      property_type.length != 0) ||
    (!code_north_highlands.includes(postal_input) &&
      location_input.includes("north highlands") &&
      property_type.length != 0) ||
    (!code_orangevale.includes(postal_input) &&
      location_input.includes("orangevale") &&
      property_type.length != 0) ||
    (!code_rancho_cordova.includes(postal_input) &&
      location_input.includes("rancho cordova") &&
      property_type.length != 0) ||
    (!code_represa.includes(postal_input) &&
      location_input.includes("represa") &&
      property_type.length != 0) ||
    (!code_rescue.includes(postal_input) &&
      location_input.includes("rescue") &&
      property_type.length != 0) ||
    (!code_rio_linda.includes(postal_input) &&
      location_input.includes("rio linda") &&
      property_type.length != 0) ||
    (!code_rocklin.includes(postal_input) &&
      location_input.includes("rocklin") &&
      property_type.length != 0) ||
    (!code_roseville.includes(postal_input) &&
      location_input.includes("rosevill") &&
      property_type.length != 0) ||
    (!code_sacramento.includes(postal_input) &&
      location_input.includes("sacramento") &&
      property_type.length != 0) ||
    (!code_west_sacramento.includes(postal_input) &&
      location_input.includes("west sacramento") &&
      property_type.length != 0) ||
    (!code_woodland.includes(postal_input) &&
      location_input.includes("woodland") &&
      property_type.length != 0) ||
    (!code_yolo.includes(postal_input) &&
      location_input.includes("yolo") &&
      property_type.length != 0) ||
    (!code_bellevue.includes(postal_input) &&
      location_input.includes("bellevue") &&
      property_type.length != 0) ||
    (!code_bothel.includes(postal_input) &&
      location_input.includes("bothel") &&
      property_type.length != 0) ||
    (!code_edmonds.includes(postal_input) &&
      location_input.includes("edmonds") &&
      property_type.length != 0) ||
    (!code_everett.includes(postal_input) &&
      location_input.includes("everett") &&
      property_type.length != 0) ||
    (!code_issaquah.includes(postal_input) &&
      location_input.includes("issaquah") &&
      property_type.length != 0) ||
    (!code_kenmore.includes(postal_input) &&
      location_input.includes("kenmore") &&
      property_type.length != 0) ||
    (!code_kent.includes(postal_input) &&
      location_input.includes("kent") &&
      property_type.length != 0) ||
    (!code_kirkland.includes(postal_input) &&
      location_input.includes("kirkland") &&
      property_type.length != 0) ||
    (!code_lynnwood.includes(postal_input) &&
      location_input.includes("lynnwood") &&
      property_type.length != 0) ||
    (!code_medina.includes(postal_input) &&
      location_input.includes("medina") &&
      property_type.length != 0) ||
    (!code_mercer_island.includes(postal_input) &&
      location_input.includes("mercer") &&
      property_type.length != 0) ||
    (!code_mill_creek.includes(postal_input) &&
      location_input.includes("mill creek") &&
      property_type.length != 0) ||
    (!code_mountlake_terrace.includes(postal_input) &&
      location_input.includes("mountlake terrace") &&
      property_type.length != 0) ||
    (!code_mukilteo.includes(postal_input) &&
      location_input.includes("mukilteo") &&
      property_type.length != 0) ||
    (!code_redmond.includes(postal_input) &&
      location_input.includes("redmond") &&
      property_type.length != 0) ||
    (!code_renton.includes(postal_input) &&
      location_input.includes("renton") &&
      property_type.length != 0) ||
    (!code_sammamish.includes(postal_input) &&
      location_input.includes("sammamish") &&
      property_type.length != 0) ||
    (!code_seahurst.includes(postal_input) &&
      location_input.includes("seahurst") &&
      property_type.length != 0) ||
    (!code_seattle.includes(postal_input) &&
      location_input.includes("seattle") &&
      property_type.length != 0) ||
    (!code_alhambra.includes(postal_input) &&
      location_input.includes("alhambra") &&
      property_type.length != 0) ||
    (!code_altadena.includes(postal_input) &&
      location_input.includes("altadena") &&
      property_type.length != 0) ||
    (!code_arcadia.includes(postal_input) &&
      location_input.includes("arcadia") &&
      property_type.length != 0) ||
    (!code_bell.includes(postal_input) &&
      location_input.includes("bell") &&
      property_type.length != 0) ||
    (!code_bell_gardens.includes(postal_input) &&
      location_input.includes("bell gardens") &&
      property_type.length != 0) ||
    (!code_bellflower.includes(postal_input) &&
      location_input.includes("bellflower") &&
      property_type.length != 0) ||
    (!code_beverly_hills.includes(postal_input) &&
      location_input.includes("beverly hills") &&
      property_type.length != 0) ||
    (!code_burbank.includes(postal_input) &&
      location_input.includes("burbank") &&
      property_type.length != 0) ||
    (!code_canoga_park.includes(postal_input) &&
      location_input.includes("canoga park") &&
      property_type.length != 0) ||
    (!code_carson.includes(postal_input) &&
      location_input.includes("carson") &&
      property_type.length != 0) ||
    (!code_chatsworth.includes(postal_input) &&
      location_input.includes("chatsworth") &&
      property_type.length != 0) ||
    (!code_city_of_industry.includes(postal_input) &&
      location_input.includes("city of industry") &&
      property_type.length != 0) ||
    (!code_compton.includes(postal_input) &&
      location_input.includes("compton") &&
      property_type.length != 0) ||
    (!code_culver_city.includes(postal_input) &&
      location_input.includes("culver") &&
      property_type.length != 0) ||
    (!code_dodgertown.includes(postal_input) &&
      location_input.includes("dodgertown") &&
      property_type.length != 0) ||
    (!code_downey.includes(postal_input) &&
      location_input.includes("downey") &&
      property_type.length != 0) ||
    (!code_duarte.includes(postal_input) &&
      location_input.includes("duarte") &&
      property_type.length != 0) ||
    (!code_el_monte.includes(postal_input) &&
      location_input.includes("el monte") &&
      property_type.length != 0) ||
    (!code_el_segundo.includes(postal_input) &&
      location_input.includes("el segundo") &&
      property_type.length != 0) ||
    (!code_gardena.includes(postal_input) &&
      location_input.includes("gardena") &&
      property_type.length != 0) ||
    (!code_glendale.includes(postal_input) &&
      location_input.includes("glendale") &&
      property_type.length != 0) ||
    (!code_granada_hills.includes(postal_input) &&
      location_input.includes("granada hills") &&
      property_type.length != 0) ||
    (!code_harbor_city.includes(postal_input) &&
      location_input.includes("harbor") &&
      property_type.length != 0) ||
    (!code_hawthorne.includes(postal_input) &&
      location_input.includes("hawthorne") &&
      property_type.length != 0) ||
    (!code_hermosa_beach.includes(postal_input) &&
      location_input.includes("hermosa beach") &&
      property_type.length != 0) ||
    (!code_huntington_park.includes(postal_input) &&
      location_input.includes("huntington park") &&
      property_type.length != 0) ||
    (!code_inglewood.includes(postal_input) &&
      location_input.includes("inglewood") &&
      property_type.length != 0) ||
    (!code_la_cañada_flintridge.includes(postal_input) &&
      location_input.includes("la cañada flintridge") &&
      property_type.length != 0) ||
    (!code_la_crescenta.includes(postal_input) &&
      location_input.includes("la crescenta") &&
      property_type.length != 0) ||
    (!code_lakewood.includes(postal_input) &&
      location_input.includes("lakewood") &&
      property_type.length != 0) ||
    (!code_lawndale.includes(postal_input) &&
      location_input.includes("lawndale") &&
      property_type.length != 0) ||
    (!code_lomita.includes(postal_input) &&
      location_input.includes("lomita") &&
      property_type.length != 0) ||
    (!code_long_beach.includes(postal_input) &&
      location_input.includes("long beach") &&
      property_type.length != 0) ||
    (!code_los_angeles.includes(postal_input) &&
      location_input.includes("los angeles") &&
      property_type.length != 0) ||
    (!code_lynwood.includes(postal_input) &&
      location_input.includes("lynwood") &&
      property_type.length != 0) ||
    (!code_manhattan_beach.includes(postal_input) &&
      location_input.includes("manhattan beach") &&
      property_type.length != 0) ||
    (!code_marina_del_rey.includes(postal_input) &&
      location_input.includes("marina del rey") &&
      property_type.length != 0) ||
    (!code_maywood.includes(postal_input) &&
      location_input.includes("maywood") &&
      property_type.length != 0) ||
    (!code_mission_hills.includes(postal_input) &&
      location_input.includes("mission hills") &&
      property_type.length != 0) ||
    (!code_monrovia.includes(postal_input) &&
      location_input.includes("monrovia") &&
      property_type.length != 0) ||
    (!code_montebello.includes(postal_input) &&
      location_input.includes("montebello") &&
      property_type.length != 0) ||
    (!code_monterey_park.includes(postal_input) &&
      location_input.includes("monterey park") &&
      property_type.length != 0) ||
    (!code_montrose.includes(postal_input) &&
      location_input.includes("montrose") &&
      property_type.length != 0) ||
    (!code_north_hills.includes(postal_input) &&
      location_input.includes("north hills") &&
      property_type.length != 0) ||
    (!code_north_hollywood.includes(postal_input) &&
      location_input.includes("hollywood") &&
      property_type.length != 0) ||
    (!code_northridge.includes(postal_input) &&
      location_input.includes("northridge") &&
      property_type.length != 0) ||
    (!code_pacoima.includes(postal_input) &&
      location_input.includes("pacoima") &&
      property_type.length != 0) ||
    (!code_palos_verdes_peninsula.includes(postal_input) &&
      location_input.includes("palos verdes") &&
      property_type.length != 0) ||
    (!code_panorama_city.includes(postal_input) &&
      location_input.includes("panorama") &&
      property_type.length != 0) ||
    (!code_paramount.includes(postal_input) &&
      location_input.includes("paramount") &&
      property_type.length != 0) ||
    (!code_pasadena.includes(postal_input) &&
      location_input.includes("pasadena") &&
      property_type.length != 0) ||
    (!code_pico_rivera.includes(postal_input) &&
      location_input.includes("pico rivera") &&
      property_type.length != 0) ||
    (!code_playa_del_rey.includes(postal_input) &&
      location_input.includes("playa del rey") &&
      property_type.length != 0) ||
    (!code_porter_ranch.includes(postal_input) &&
      location_input.includes("porter ranch") &&
      property_type.length != 0) ||
    (!code_rancho_palos_verdes.includes(postal_input) &&
      location_input.includes("rancho palos verdes") &&
      property_type.length != 0) ||
    (!code_redondo_beach.includes(postal_input) &&
      location_input.includes("redondo beach") &&
      property_type.length != 0) ||
    (!code_reseda.includes(postal_input) &&
      location_input.includes("reseda") &&
      property_type.length != 0) ||
    (!code_rosemead.includes(postal_input) &&
      location_input.includes("rosemead") &&
      property_type.length != 0) ||
    (!code_san_fernando.includes(postal_input) &&
      location_input.includes("san fernando") &&
      property_type.length != 0) ||
    (!code_san_gabriel.includes(postal_input) &&
      location_input.includes("san gabriel") &&
      property_type.length != 0) ||
    (!code_san_marino.includes(postal_input) &&
      location_input.includes("san marino") &&
      property_type.length != 0) ||
    (!code_san_pedro.includes(postal_input) &&
      location_input.includes("san pedro") &&
      property_type.length != 0) ||
    (!code_santa_monica.includes(postal_input) &&
      location_input.includes("santa monica") &&
      property_type.length != 0) ||
    (!code_sierra_madre.includes(postal_input) &&
      location_input.includes("sierra madre") &&
      property_type.length != 0) ||
    (!code_signal_hill.includes(postal_input) &&
      location_input.includes("signal hill") &&
      property_type.length != 0) ||
    (!code_south_el_monte.includes(postal_input) &&
      location_input.includes("south el monte") &&
      property_type.length != 0) ||
    (!code_south_gate.includes(postal_input) &&
      location_input.includes("south gate") &&
      property_type.length != 0) ||
    (!code_south_pasadena.includes(postal_input) &&
      location_input.includes("south pasadena") &&
      property_type.length != 0) ||
    (!code_studio_city.includes(postal_input) &&
      location_input.includes("studio") &&
      property_type.length != 0) ||
    (!code_sun_valley.includes(postal_input) &&
      location_input.includes("sun valley") &&
      property_type.length != 0) ||
    (!code_sylmar.includes(postal_input) &&
      location_input.includes("sylmar") &&
      property_type.length != 0) ||
    (!code_tarzana.includes(postal_input) &&
      location_input.includes("tarzana") &&
      property_type.length != 0) ||
    (!code_temple_city.includes(postal_input) &&
      location_input.includes("temple") &&
      property_type.length != 0) ||
    (!code_toluca_lake.includes(postal_input) &&
      location_input.includes("toluca lake") &&
      property_type.length != 0) ||
    (!code_torrance.includes(postal_input) &&
      location_input.includes("torrance") &&
      property_type.length != 0) ||
    (!code_tujunga.includes(postal_input) &&
      location_input.includes("tujunga") &&
      property_type.length != 0) ||
    (!code_universal_city.includes(postal_input) &&
      location_input.includes("universal") &&
      property_type.length != 0) ||
    (!code_valencia.includes(postal_input) &&
      location_input.includes("valencia") &&
      property_type.length != 0) ||
    (!code_valley_village.includes(postal_input) &&
      location_input.includes("valley village") &&
      property_type.length != 0) ||
    (!code_van_nuys.includes(postal_input) &&
      location_input.includes("van nuys") &&
      property_type.length != 0) ||
    (!code_venice.includes(postal_input) &&
      location_input.includes("venice") &&
      property_type.length != 0) ||
    (!code_verdugo_city.includes(postal_input) &&
      location_input.includes("verdugo") &&
      property_type.length != 0) ||
    (!code_west_hills.includes(postal_input) &&
      location_input.includes("west hills") &&
      property_type.length != 0) ||
    (!code_west_hollywood.includes(postal_input) &&
      location_input.includes("west hollywood") &&
      property_type.length != 0) ||
    (!code_wilmington.includes(postal_input) &&
      location_input.includes("wilmington") &&
      property_type.length != 0) ||
    (!code_winnetka.includes(postal_input) &&
      location_input.includes("winnetka") &&
      property_type.length != 0) ||
    (!code_woodland_hills.includes(postal_input) &&
      location_input.includes("woodland hills") &&
      property_type.length != 0) ||
    (!code_alameda.includes(postal_input) &&
      location_input.includes("alameda") &&
      property_type.length != 0) ||
    (!code_alamo.includes(postal_input) &&
      location_input.includes("alamo") &&
      property_type.length != 0) ||
    (!code_albany.includes(postal_input) &&
      location_input.includes("albany") &&
      property_type.length != 0) ||
    (!code_alviso.includes(postal_input) &&
      location_input.includes("alviso") &&
      property_type.length != 0) ||
    (!code_antioch.includes(postal_input) &&
      location_input.includes("antioch") &&
      property_type.length != 0) ||
    (!code_atherton.includes(postal_input) &&
      location_input.includes("atherton") &&
      property_type.length != 0) ||
    (!postal_input.includes(code_belmont) &&
      location_input.includes("belmont") &&
      property_type.length != 0) ||
    (!code_belvedere_tiburon.includes(postal_input) &&
      location_input.includes("tiburon") &&
      property_type.length != 0) ||
    (!code_berkeley.includes(postal_input) &&
      location_input.includes("berkeley") &&
      property_type.length != 0) ||
    (!code_brentwood.includes(postal_input) &&
      location_input.includes("brentwood") &&
      property_type.length != 0) ||
    (!postal_input.includes(code_brisbane) &&
      location_input.includes("brisbane") &&
      property_type.length != 0) ||
    (!code_burlingame.includes(postal_input) &&
      location_input.includes("burlingame") &&
      property_type.length != 0) ||
    (!code_byron.includes(postal_input) &&
      location_input.includes("byron") &&
      property_type.length != 0) ||
    (!code_campbell.includes(postal_input) &&
      location_input.includes("campbell") &&
      property_type.length != 0) ||
    (!code_canyon.includes(postal_input) &&
      location_input.includes("canyon") &&
      property_type.length != 0) ||
    (!code_capitola.includes(postal_input) &&
      location_input.includes("capitola") &&
      property_type.length != 0) ||
    (!code_castro_valley.includes(postal_input) &&
      location_input.includes("castro valley") &&
      property_type.length != 0) ||
    (!code_clayton.includes(postal_input) &&
      location_input.includes("clayton") &&
      property_type.length != 0) ||
    (!code_concord.includes(postal_input) &&
      location_input.includes("concord") &&
      property_type.length != 0) ||
    (!code_corte_madera.includes(postal_input) &&
      location_input.includes("corte madera") &&
      property_type.length != 0) ||
    (!code_coyote.includes(postal_input) &&
      location_input.includes("coyote") &&
      property_type.length != 0) ||
    (!code_crockett.includes(postal_input) &&
      location_input.includes("crockett") &&
      property_type.length != 0) ||
    (!code_cupertino.includes(postal_input) &&
      location_input.includes("cupertino") &&
      property_type.length != 0) ||
    (!code_daly_city.includes(postal_input) &&
      location_input.includes("daly") &&
      property_type.length != 0) ||
    (!code_danville.includes(postal_input) &&
      location_input.includes("danville") &&
      property_type.length != 0) ||
    (!code_diablo.includes(postal_input) &&
      location_input.includes("diablo") &&
      property_type.length != 0) ||
    (!code_dublin.includes(postal_input) &&
      location_input.includes("dublin") &&
      property_type.length != 0) ||
    (!code_el_cerrito.includes(postal_input) &&
      location_input.includes("el cerrito") &&
      property_type.length != 0) ||
    (!code_el_granada.includes(postal_input) &&
      location_input.includes("el granada") &&
      property_type.length != 0) ||
    (!code_el_sobrante.includes(postal_input) &&
      location_input.includes("el sobrante") &&
      property_type.length != 0) ||
    (!code_emeryville.includes(postal_input) &&
      location_input.includes("emeryville") &&
      property_type.length != 0) ||
    (!code_fremont.includes(postal_input) &&
      location_input.includes("fremont") &&
      property_type.length != 0) ||
    (!code_gilroy.includes(postal_input) &&
      location_input.includes("gilroy") &&
      property_type.length != 0) ||
    (!code_greenbrae.includes(postal_input) &&
      location_input.includes("greenbrae") &&
      property_type.length != 0) ||
    (!code_half_moon_bay.includes(postal_input) &&
      location_input.includes("half moon bay") &&
      property_type.length != 0) ||
    (!code_hayward.includes(postal_input) &&
      location_input.includes("hayward") &&
      property_type.length != 0) ||
    (!code_hercules.includes(postal_input) &&
      location_input.includes("hercules") &&
      property_type.length != 0) ||
    (!code_kentfield.includes(postal_input) &&
      location_input.includes("kentfield") &&
      property_type.length != 0) ||
    (!code_lafayette.includes(postal_input) &&
      location_input.includes("lafayette") &&
      property_type.length != 0) ||
    (!code_larkspur.includes(postal_input) &&
      location_input.includes("larkspur") &&
      property_type.length != 0) ||
    (!code_livermore.includes(postal_input) &&
      location_input.includes("livermore") &&
      property_type.length != 0) ||
    (!code_los_altos.includes(postal_input) &&
      location_input.includes("los altos") &&
      property_type.length != 0) ||
    (!code_los_gatos.includes(postal_input) &&
      location_input.includes("los gatos") &&
      property_type.length != 0) ||
    (!code_martinez.includes(postal_input) &&
      location_input.includes("martinez") &&
      property_type.length != 0) ||
    (!code_menlo_park.includes(postal_input) &&
      location_input.includes("menlo park") &&
      property_type.length != 0) ||
    (!code_mill_valley.includes(postal_input) &&
      location_input.includes("mill valley") &&
      property_type.length != 0) ||
    (!code_millbrae.includes(postal_input) &&
      location_input.includes("millbrae") &&
      property_type.length != 0) ||
    (!code_milpitas.includes(postal_input) &&
      location_input.includes("milpitas") &&
      property_type.length != 0) ||
    (!code_montara.includes(postal_input) &&
      location_input.includes("montara") &&
      property_type.length != 0) ||
    (!code_moraga.includes(postal_input) &&
      location_input.includes("moraga") &&
      property_type.length != 0) ||
    (!code_morgan_hill.includes(postal_input) &&
      location_input.includes("morgan hill") &&
      property_type.length != 0) ||
    (!code_moss_beach.includes(postal_input) &&
      location_input.includes("moss beach") &&
      property_type.length != 0) ||
    (!code_mountain_view.includes(postal_input) &&
      location_input.includes("mountain view") &&
      property_type.length != 0) ||
    (!code_newark.includes(postal_input) &&
      location_input.includes("newark") &&
      property_type.length != 0) ||
    (!code_oakland.includes(postal_input) &&
      location_input.includes("oakland") &&
      property_type.length != 0) ||
    (!code_orinda.includes(postal_input) &&
      location_input.includes("orinda") &&
      property_type.length != 0) ||
    (!code_pacifica.includes(postal_input) &&
      location_input.includes("pacifica") &&
      property_type.length != 0) ||
    (!code_palo_alto.includes(postal_input) &&
      location_input.includes("palo alto") &&
      property_type.length != 0) ||
    (!code_piedmont.includes(postal_input) &&
      location_input.includes("piedmont") &&
      property_type.length != 0) ||
    (!code_pinole.includes(postal_input) &&
      location_input.includes("pinole") &&
      property_type.length != 0) ||
    (!code_pittsburg.includes(postal_input) &&
      location_input.includes("pittsburg") &&
      property_type.length != 0) ||
    (!code_pleasant_hill.includes(postal_input) &&
      location_input.includes("pleasant hill") &&
      property_type.length != 0) ||
    (!code_pleasanton.includes(postal_input) &&
      location_input.includes("pleasanton") &&
      property_type.length != 0) ||
    (!code_port_costa.includes(postal_input) &&
      location_input.includes("port costa") &&
      property_type.length != 0) ||
    (!code_redwood_city.includes(postal_input) &&
      location_input.includes("redwood") &&
      property_type.length != 0) ||
    (!code_richmond.includes(postal_input) &&
      location_input.includes("richmond") &&
      property_type.length != 0) ||
    (!code_rodeo.includes(postal_input) &&
      location_input.includes("rodeo") &&
      property_type.length != 0) ||
    (!code_ross.includes(postal_input) &&
      location_input.includes("ross") &&
      property_type.length != 0) ||
    (!code_san_anselmo.includes(postal_input) &&
      location_input.includes("san anselmo") &&
      property_type.length != 0) ||
    (!code_san_bruno.includes(postal_input) &&
      location_input.includes("san bruno") &&
      property_type.length != 0) ||
    (!code_san_carlos.includes(postal_input) &&
      location_input.includes("san carlos") &&
      property_type.length != 0) ||
    (!code_san_francisco.includes(postal_input) &&
      location_input.includes("san francisco") &&
      property_type.length != 0) ||
    (!code_san_jose.includes(postal_input) &&
      location_input.includes("san jose") &&
      property_type.length != 0) ||
    (!code_san_leandro.includes(postal_input) &&
      location_input.includes("san leandro") &&
      property_type.length != 0) ||
    (!code_lorenzo.includes(postal_input) &&
      location_input.includes("lorenzo") &&
      property_type.length != 0) ||
    (!code_san_martin.includes(postal_input) &&
      location_input.includes("san martin") &&
      property_type.length != 0) ||
    (!code_san_mateo.includes(postal_input) &&
      location_input.includes("san mateo") &&
      property_type.length != 0) ||
    (!code_san_pablo.includes(postal_input) &&
      location_input.includes("san pablo") &&
      property_type.length != 0) ||
    (!code_san_quentin.includes(postal_input) &&
      location_input.includes("san quentin") &&
      property_type.length != 0) ||
    (!code_san_rafael.includes(postal_input) &&
      location_input.includes("san rafael") &&
      property_type.length != 0) ||
    (!code_san_ramon.includes(postal_input) &&
      location_input.includes("san ramon") &&
      property_type.length != 0) ||
    (!code_santa_clara.includes(postal_input) &&
      location_input.includes("santa clara") &&
      property_type.length != 0) ||
    (!code_santa_cruz.includes(postal_input) &&
      location_input.includes("santa cruz") &&
      property_type.length != 0) ||
    (!code_saratoga.includes(postal_input) &&
      location_input.includes("saratoga") &&
      property_type.length != 0) ||
    (!code_sausalito.includes(postal_input) &&
      location_input.includes("sausalito") &&
      property_type.length != 0) ||
    (!code_scotts_valley.includes(postal_input) &&
      location_input.includes("scotts valley") &&
      property_type.length != 0) ||
    (!code_south_san_francisco.includes(postal_input) &&
      location_input.includes("south san francisco") &&
      property_type.length != 0) ||
    (!code_stanford.includes(postal_input) &&
      location_input.includes("stanford") &&
      property_type.length != 0) ||
    (!code_sunnyvale.includes(postal_input) &&
      location_input.includes("sunnyvale") &&
      property_type.length != 0) ||
    (!code_sunol.includes(postal_input) &&
      location_input.includes("sunol") &&
      property_type.length != 0) ||
    (!code_tracy.includes(postal_input) &&
      location_input.includes("tracy") &&
      property_type.length != 0) ||
    (!code_union_city.includes(postal_input) &&
      location_input.includes("union city") &&
      property_type.length != 0) ||
    (!code_vallejo.includes(postal_input) &&
      location_input.includes("vallejo") &&
      property_type.length != 0) ||
    (!code_walnut_creek.includes(postal_input) &&
      location_input.includes("walnut creek") &&
      property_type.length != 0) ||
    (!code_bonita.includes(postal_input) &&
      location_input.includes("bonita") &&
      property_type.length != 0) ||
    (!code_bonsall.includes(postal_input) &&
      location_input.includes("bonsall") &&
      property_type.length != 0) ||
    (!code_cardiff_by_the_sea.includes(postal_input) &&
      location_input.includes("cardiff") &&
      property_type.length != 0) ||
    (!code_cardiff_by_the_sea.includes(postal_input) &&
      location_input.includes("cardiff-by-the-sea") &&
      property_type.length != 0) ||
    (!code_carlsbad.includes(postal_input) &&
      location_input.includes("carlsbad") &&
      property_type.length != 0) ||
    (!code_chula_vista.includes(postal_input) &&
      location_input.includes("chula vista") &&
      property_type.length != 0) ||
    (!code_coronado.includes(postal_input) &&
      location_input.includes("coronado") &&
      property_type.length != 0) ||
    (!code_del_mar.includes(postal_input) &&
      location_input.includes("del mar") &&
      property_type.length != 0) ||
    (!code_el_cajon.includes(postal_input) &&
      location_input.includes("el cajon") &&
      property_type.length != 0) ||
    (!code_encinitas.includes(postal_input) &&
      location_input.includes("encinitas") &&
      property_type.length != 0) ||
    (!code_escondido.includes(postal_input) &&
      location_input.includes("escondido") &&
      property_type.length != 0) ||
    (!code_fallbrook.includes(postal_input) &&
      location_input.includes("fallbrook") &&
      property_type.length != 0) ||
    (!code_imperial_beach.includes(postal_input) &&
      location_input.includes("imperial beach") &&
      property_type.length != 0) ||
    (!code_la_jolla.includes(postal_input) &&
      location_input.includes("la jolla") &&
      property_type.length != 0) ||
    (!code_la_mesa.includes(postal_input) &&
      location_input.includes("la mesa") &&
      property_type.length != 0) ||
    (!code_lemon_grove.includes(postal_input) &&
      location_input.includes("lemon grove") &&
      property_type.length != 0) ||
    (!code_national_city.includes(postal_input) &&
      location_input.includes("national") &&
      property_type.length != 0) ||
    (!code_oceanside.includes(postal_input) &&
      location_input.includes("oceanside") &&
      property_type.length != 0) ||
    (!code_poway.includes(postal_input) &&
      location_input.includes("poway") &&
      property_type.length != 0) ||
    (!code_rancho_santa_fe.includes(postal_input) &&
      location_input.includes("rancho santa fe") &&
      property_type.length != 0) ||
    (!code_san_diego.includes(postal_input) &&
      location_input.includes("san diego") &&
      property_type.length != 0) ||
    (!code_san_luis_rey.includes(postal_input) &&
      location_input.includes("san luis rey") &&
      property_type.length != 0) ||
    (!code_san_marcos.includes(postal_input) &&
      location_input.includes("san marcos") &&
      property_type.length != 0) ||
    (!code_san_ysidro.includes(postal_input) &&
      location_input.includes("san ysidro") &&
      property_type.length != 0) ||
    (!code_santee.includes(postal_input) &&
      location_input.includes("santee") &&
      property_type.length != 0) ||
    (!code_solana_beach.includes(postal_input) &&
      location_input.includes("solana beach") &&
      property_type.length != 0) ||
    (!code_spring_valley.includes(postal_input) &&
      location_input.includes("spring valley") &&
      property_type.length != 0) ||
    (!code_vista.includes(postal_input) &&
      location_input.includes("vista") &&
      property_type.length != 0) ||
    (!code_aliso_viejo.includes(postal_input) &&
      location_input.includes("aliso viejo") &&
      property_type.length != 0) ||
    (!code_bloomington.includes(postal_input) &&
      location_input.includes("bloomington") &&
      property_type.length != 0) ||
    (!code_bryn_mawr.includes(postal_input) &&
      location_input.includes("bryn mawr") &&
      property_type.length != 0) ||
    (!code_buena_park.includes(postal_input) &&
      location_input.includes("buena park") &&
      property_type.length != 0) ||
    (!code_capistrano_beach.includes(postal_input) &&
      location_input.includes("capistrano beach") &&
      property_type.length != 0) ||
    (!code_chino.includes(postal_input) &&
      location_input.includes("chino") &&
      property_type.length != 0) ||
    (!code_claremont.includes(postal_input) &&
      location_input.includes("claremont") &&
      property_type.length != 0) ||
    (!code_colton.includes(postal_input) &&
      location_input.includes("colton") &&
      property_type.length != 0) ||
    (!code_corona.includes(postal_input) &&
      location_input.includes("corona") &&
      property_type.length != 0) ||
    (!code_dana_point.includes(postal_input) &&
      location_input.includes("dana point") &&
      property_type.length != 0) ||
    (!code_el_toro.includes(postal_input) &&
      location_input.includes("el toro") &&
      property_type.length != 0) ||
    (!code_fontana.includes(postal_input) &&
      location_input.includes("fontana") &&
      property_type.length != 0) ||
    (!code_grand_terrace.includes(postal_input) &&
      location_input.includes("grand terrace") &&
      property_type.length != 0) ||
    (!code_guasti.includes(postal_input) &&
      location_input.includes("guasti") &&
      property_type.length != 0) ||
    (!code_highland.includes(postal_input) &&
      location_input.includes("highland") &&
      property_type.length != 0) ||
    (!code_irvine.includes(postal_input) &&
      location_input.includes("irvine") &&
      property_type.length != 0) ||
    (!code_ladera_ranch.includes(postal_input) &&
      location_input.includes("ladera ranch") &&
      property_type.length != 0) ||
    (!code_laguna_beach.includes(postal_input) &&
      location_input.includes("laguna beach") &&
      property_type.length != 0) ||
    (!code_laguna_hills.includes(postal_input) &&
      location_input.includes("laguna hills") &&
      property_type.length != 0) ||
    (!code_laguna_niguel.includes(postal_input) &&
      location_input.includes("laguna niguel") &&
      property_type.length != 0) ||
    (!code_laguna_woods.includes(postal_input) &&
      location_input.includes("laguna woods") &&
      property_type.length != 0) ||
    (!code_lake_forest.includes(postal_input) &&
      location_input.includes("lake forest") &&
      property_type.length != 0) ||
    (!code_loma_linda.includes(postal_input) &&
      location_input.includes("loma linda") &&
      property_type.length != 0) ||
    (!code_march_air_reserve_base.includes(postal_input) &&
      location_input.includes("march air reserve") &&
      property_type.length != 0) ||
    (!code_mira_loma.includes(postal_input) &&
      location_input.includes("mira loma") &&
      property_type.length != 0) ||
    (!code_mission_viejo.includes(postal_input) &&
      location_input.includes("mission viejo") &&
      property_type.length != 0) ||
    (!code_montclair.includes(postal_input) &&
      location_input.includes("montclair") &&
      property_type.length != 0) ||
    (!code_moreno_valley.includes(postal_input) &&
      location_input.includes("moreno valley") &&
      property_type.length != 0) ||
    (!code_norco.includes(postal_input) &&
      location_input.includes("norco") &&
      property_type.length != 0) ||
    (!code_ontario.includes(postal_input) &&
      location_input.includes("ontario") &&
      property_type.length != 0) ||
    (!code_patton.includes(postal_input) &&
      location_input.includes("patton") &&
      property_type.length != 0) ||
    (!code_perris.includes(postal_input) &&
      location_input.includes("perris") &&
      property_type.length != 0) ||
    (!code_pomona.includes(postal_input) &&
      location_input.includes("pomona") &&
      property_type.length != 0) ||
    (!code_ranco_cucamonga.includes(postal_input) &&
      location_input.includes("rancho cucamonga") &&
      property_type.length != 0) ||
    (!code_rancho_santa_margarita.includes(postal_input) &&
      location_input.includes("rancho santa margarita") &&
      property_type.length != 0) ||
    (!code_redlands.includes(postal_input) &&
      location_input.includes("redlands") &&
      property_type.length != 0) ||
    (!code_rialto.includes(postal_input) &&
      location_input.includes("rialto") &&
      property_type.length != 0) ||
    (!code_riverside.includes(postal_input) &&
      location_input.includes("riverside") &&
      property_type.length != 0) ||
    (!code_san_bernardino.includes(postal_input) &&
      location_input.includes("san bernardino") &&
      property_type.length != 0) ||
    (!code_san_clemente.includes(postal_input) &&
      location_input.includes("san clemente") &&
      property_type.length != 0) ||
    (!code_san_dimas.includes(postal_input) &&
      location_input.includes("san dimas") &&
      property_type.length != 0) ||
    (!code_san_juan_capistrano.includes(postal_input) &&
      location_input.includes("san juan capistrano") &&
      property_type.length != 0) ||
    (!code_upland.includes(postal_input) &&
      location_input.includes("upland") &&
      property_type.length != 0) ||
    (!code_arvada.includes(postal_input) &&
      location_input.includes("arvada") &&
      property_type.length != 0) ||
    (!code_aurora.includes(postal_input) &&
      location_input.includes("aurora") &&
      property_type.length != 0) ||
    (!code_boulder.includes(postal_input) &&
      location_input.includes("boulder") &&
      property_type.length != 0) ||
    (!code_brighton.includes(postal_input) &&
      location_input.includes("brighton") &&
      property_type.length != 0) ||
    (!code_broomfield.includes(postal_input) &&
      location_input.includes("broomfield") &&
      property_type.length != 0) ||
    (!code_commerce_city.includes(postal_input) &&
      location_input.includes("commerce city") &&
      property_type.length != 0) ||
    (!code_denver.includes(postal_input) &&
      location_input.includes("denver") &&
      property_type.length != 0) ||
    (!code_dupont.includes(postal_input) &&
      location_input.includes("dupont") &&
      property_type.length != 0) ||
    (!code_eastlake.includes(postal_input) &&
      location_input.includes("eastlake") &&
      property_type.length != 0) ||
    (!code_englewood.includes(postal_input) &&
      location_input.includes("englewood") &&
      property_type.length != 0) ||
    (!code_henderson.includes(postal_input) &&
      location_input.includes("henderson") &&
      property_type.length != 0) ||
    (!code_littleton.includes(postal_input) &&
      location_input.includes("littleton") &&
      property_type.length != 0) ||
    (!code_westminster.includes(postal_input) &&
      location_input.includes("westminster") &&
      property_type.length != 0) ||
    (!code_blue_diamond.includes(postal_input) &&
      location_input.includes("blue diamond") &&
      property_type.length != 0) ||
    (!code_boulder_city.includes(postal_input) &&
      location_input.includes("boulder") &&
      property_type.length != 0) ||
    (!code_bunkerville.includes(postal_input) &&
      location_input.includes("bunkerville") &&
      property_type.length != 0) ||
    (!code_cal_nev_ari.includes(postal_input) &&
      location_input.includes("cal nev ari") &&
      property_type.length != 0) ||
    (!code_coyote_springs.includes(postal_input) &&
      location_input.includes("coyote springs") &&
      property_type.length != 0) ||
    (!code_henderson.includes(postal_input) &&
      location_input.includes("henderson") &&
      property_type.length != 0) ||
    (!code_indian_springs.includes(postal_input) &&
      location_input.includes("indian springs") &&
      property_type.length != 0) ||
    (!code_jean.includes(postal_input) &&
      location_input.includes("jean") &&
      property_type.length != 0) ||
    (!code_las_vegas.includes(postal_input) &&
      location_input.includes("las vegas") &&
      property_type.length != 0) ||
    (!code_laughlin.includes(postal_input) &&
      location_input.includes("laughlin") &&
      property_type.length != 0) ||
    (!code_logandale.includes(postal_input) &&
      location_input.includes("logandale") &&
      property_type.length != 0) ||
    (!code_mesquite.includes(postal_input) &&
      location_input.includes("mesquite") &&
      property_type.length != 0) ||
    (!code_moapa.includes(postal_input) &&
      location_input.includes("moapa") &&
      property_type.length != 0) ||
    (!code_nellis_afb.includes(postal_input) &&
      location_input.includes("nellis afb") &&
      property_type.length != 0) ||
    (!code_nellis_afb.includes(postal_input) &&
      location_input.includes("nellis air force base") &&
      property_type.length != 0) ||
    (!code_north_las_vegas.includes(postal_input) &&
      location_input.includes("north las vegas") &&
      property_type.length != 0) ||
    (!code_overton.includes(postal_input) &&
      location_input.includes("overton") &&
      property_type.length != 0) ||
    (!code_searchlight.includes(postal_input) &&
      location_input.includes("searchlight") &&
      property_type.length != 0) ||
    (!code_sloan.includes(postal_input) &&
      location_input.includes("sloan") &&
      property_type.length != 0) ||
    (!code_the_lakes.includes(postal_input) &&
      location_input.includes("the lakes") &&
      property_type.length != 0) ||
    (!code_accokeek.includes(postal_input) &&
      location_input.includes("accokeek") &&
      property_type.length != 0) ||
    (!code_andrews_air_force_base.includes(postal_input) &&
      location_input.includes("andrews air force base") &&
      property_type.length != 0) ||
    (!code_andrews_air_force_base.includes(postal_input) &&
      location_input.includes("andrews afb") &&
      property_type.length != 0) ||
    (!code_annapolis.includes(postal_input) &&
      location_input.includes("annapolis") &&
      property_type.length != 0) ||
    (!code_annapolis_junction.includes(postal_input) &&
      location_input.includes("annapolis junction") &&
      property_type.length != 0) ||
    (!code_aquasco.includes(postal_input) &&
      location_input.includes("aquasco") &&
      property_type.length != 0) ||
    (!code_arnold.includes(postal_input) &&
      location_input.includes("arnold") &&
      property_type.length != 0) ||
    (!code_ashton.includes(postal_input) &&
      location_input.includes("ashton") &&
      property_type.length != 0) ||
    (!code_baltimore.includes(postal_input) &&
      location_input.includes("baltimore") &&
      property_type.length != 0) ||
    (!code_barnesville.includes(postal_input) &&
      location_input.includes("barnesville") &&
      property_type.length != 0) ||
    (!code_beallsville.includes(postal_input) &&
      location_input.includes("beallsville") &&
      property_type.length != 0) ||
    (!code_beltsville.includes(postal_input) &&
      location_input.includes("beltsville") &&
      property_type.length != 0) ||
    (!code_bethesda.includes(postal_input) &&
      location_input.includes("bethesda") &&
      property_type.length != 0) ||
    (!code_bladensburg.includes(postal_input) &&
      location_input.includes("bladensburg") &&
      property_type.length != 0) ||
    (!code_bowie.includes(postal_input) &&
      location_input.includes("bowie") &&
      property_type.length != 0) ||
    (!code_boyds.includes(postal_input) &&
      location_input.includes("boyds") &&
      property_type.length != 0) ||
    (!code_brandywine.includes(postal_input) &&
      location_input.includes("brandywine") &&
      property_type.length != 0) ||
    (!code_brentwood.includes(postal_input) &&
      location_input.includes("brentwood") &&
      property_type.length != 0) ||
    (!code_brinklow.includes(postal_input) &&
      location_input.includes("brinklow") &&
      property_type.length != 0) ||
    (!code_brookeville.includes(postal_input) &&
      location_input.includes("brookeville") &&
      property_type.length != 0) ||
    (!code_burtonsville.includes(postal_input) &&
      location_input.includes("burtonsville") &&
      property_type.length != 0) ||
    (!code_cabin_john.includes(postal_input) &&
      location_input.includes("cabin john") &&
      property_type.length != 0) ||
    (!code_capitol_heights.includes(postal_input) &&
      location_input.includes("capitol heights") &&
      property_type.length != 0) ||
    (!code_cheltenham.includes(postal_input) &&
      location_input.includes("cheltenham") &&
      property_type.length != 0) ||
    (!code_chevy_chase.includes(postal_input) &&
      location_input.includes("chevy chase") &&
      property_type.length != 0) ||
    (!code_churchton.includes(postal_input) &&
      location_input.includes("churchton") &&
      property_type.length != 0) ||
    (!code_clarksburg.includes(postal_input) &&
      location_input.includes("clarksburg") &&
      property_type.length != 0) ||
    (!code_clarksville.includes(postal_input) &&
      location_input.includes("clarksville") &&
      property_type.length != 0) ||
    (!code_clinton.includes(postal_input) &&
      location_input.includes("clinton") &&
      property_type.length != 0) ||
    (!code_college_park.includes(postal_input) &&
      location_input.includes("college park") &&
      property_type.length != 0) ||
    (!code_columbia.includes(postal_input) &&
      location_input.includes("columbia") &&
      property_type.length != 0) ||
    (!code_cooksville.includes(postal_input) &&
      location_input.includes("cooksville") &&
      property_type.length != 0) ||
    (!code_crofton.includes(postal_input) &&
      location_input.includes("crofton") &&
      property_type.length != 0) ||
    (!code_crownsville.includes(postal_input) &&
      location_input.includes("crownsville") &&
      property_type.length != 0) ||
    (!code_curtis_bay.includes(postal_input) &&
      location_input.includes("curtis bay") &&
      property_type.length != 0) ||
    (!code_damascus.includes(postal_input) &&
      location_input.includes("damascus") &&
      property_type.length != 0) ||
    (!code_davidsonville.includes(postal_input) &&
      location_input.includes("davidsonville") &&
      property_type.length != 0) ||
    (!code_dayton.includes(postal_input) &&
      location_input.includes("dayton") &&
      property_type.length != 0) ||
    (!code_deale.includes(postal_input) &&
      location_input.includes("deale") &&
      property_type.length != 0) ||
    (!code_derwood.includes(postal_input) &&
      location_input.includes("derwood") &&
      property_type.length != 0) ||
    (!code_dickerson.includes(postal_input) &&
      location_input.includes("dickerson") &&
      property_type.length != 0) ||
    (!code_district_heights.includes(postal_input) &&
      location_input.includes("district heights") &&
      property_type.length != 0) ||
    (!code_edgewater.includes(postal_input) &&
      location_input.includes("edgewater") &&
      property_type.length != 0) ||
    (!code_elkridge.includes(postal_input) &&
      location_input.includes("elkridge") &&
      property_type.length != 0) ||
    (!code_ellicott_city.includes(postal_input) &&
      location_input.includes("ellicott") &&
      property_type.length != 0) ||
    (!code_fort_george.includes(postal_input) &&
      location_input.includes("fort george") &&
      property_type.length != 0) ||
    (!code_fort_washington.includes(postal_input) &&
      location_input.includes("fort washington") &&
      property_type.length != 0) ||
    (!code_friendship.includes(postal_input) &&
      location_input.includes("friendship") &&
      property_type.length != 0) ||
    (!code_fulton.includes(postal_input) &&
      location_input.includes("fulton") &&
      property_type.length != 0) ||
    (!code_gaithersburg.includes(postal_input) &&
      location_input.includes("gaithersburg") &&
      property_type.length != 0) ||
    (!code_galesville.includes(postal_input) &&
      location_input.includes("galesville") &&
      property_type.length != 0) ||
    (!code_gambrills.includes(postal_input) &&
      location_input.includes("gambrills") &&
      property_type.length != 0) ||
    (!code_garrett_park.includes(postal_input) &&
      location_input.includes("garrett park") &&
      property_type.length != 0) ||
    (!code_germantown.includes(postal_input) &&
      location_input.includes("germantown") &&
      property_type.length != 0) ||
    (!code_gibson_island.includes(postal_input) &&
      location_input.includes("gibson island") &&
      property_type.length != 0) ||
    (!code_glen_burnie.includes(postal_input) &&
      location_input.includes("glen burnie") &&
      property_type.length != 0) ||
    (!code_glen_echo.includes(postal_input) &&
      location_input.includes("glen echo") &&
      property_type.length != 0) ||
    (!code_glenelg.includes(postal_input) &&
      location_input.includes("glenelg") &&
      property_type.length != 0) ||
    (!code_glenn_dale.includes(postal_input) &&
      location_input.includes("glenn dale") &&
      property_type.length != 0) ||
    (!code_glenwood.includes(postal_input) &&
      location_input.includes("glenwood") &&
      property_type.length != 0) ||
    (!code_greenbelt.includes(postal_input) &&
      location_input.includes("greenbelt") &&
      property_type.length != 0) ||
    (!code_hanover.includes(postal_input) &&
      location_input.includes("hanover") &&
      property_type.length != 0) ||
    (!code_harmans.includes(postal_input) &&
      location_input.includes("harmans") &&
      property_type.length != 0) ||
    (!code_harwood.includes(postal_input) &&
      location_input.includes("harwood") &&
      property_type.length != 0) ||
    (!code_highland.includes(postal_input) &&
      location_input.includes("highland") &&
      property_type.length != 0) ||
    (!code_hyattsville.includes(postal_input) &&
      location_input.includes("hyattsville") &&
      property_type.length != 0) ||
    (!code_jessup.includes(postal_input) &&
      location_input.includes("jessup") &&
      property_type.length != 0) ||
    (!code_kensington.includes(postal_input) &&
      location_input.includes("kensington") &&
      property_type.length != 0) ||
    (!code_lanham.includes(postal_input) &&
      location_input.includes("lanham") &&
      property_type.length != 0) ||
    (!code_laurel.includes(postal_input) &&
      location_input.includes("laurel") &&
      property_type.length != 0) ||
    (!code_linthicum_heights.includes(postal_input) &&
      location_input.includes("linthicum heights") &&
      property_type.length != 0) ||
    (!code_lisbon.includes(postal_input) &&
      location_input.includes("lisbon") &&
      property_type.length != 0) ||
    (!code_mayo.includes(postal_input) &&
      location_input.includes("mayo") &&
      property_type.length != 0) ||
    (!code_millersville.includes(postal_input) &&
      location_input.includes("millersville") &&
      property_type.length != 0) ||
    (!code_montgomery_village.includes(postal_input) &&
      location_input.includes("montgomery village") &&
      property_type.length != 0) ||
    (!code_mount_rainier.includes(postal_input) &&
      location_input.includes("mount rainier") &&
      property_type.length != 0) ||
    (!code_odenton.includes(postal_input) &&
      location_input.includes("odenton") &&
      property_type.length != 0) ||
    (!code_olney.includes(postal_input) &&
      location_input.includes("olney") &&
      property_type.length != 0) ||
    (!code_oxon_hill.includes(postal_input) &&
      location_input.includes("oxon hill") &&
      property_type.length != 0) ||
    (!code_poolesville.includes(postal_input) &&
      location_input.includes("poolesville") &&
      property_type.length != 0) ||
    (!code_potomac.includes(postal_input) &&
      location_input.includes("potomac") &&
      property_type.length != 0) ||
    (!code_riva.includes(postal_input) &&
      location_input.includes("riva") &&
      property_type.length != 0) ||
    (!code_riverdale.includes(postal_input) &&
      location_input.includes("riverdale") &&
      property_type.length != 0) ||
    (!code_rockville.includes(postal_input) &&
      location_input.includes("rockville") &&
      property_type.length != 0) ||
    (!code_sandy_spring.includes(postal_input) &&
      location_input.includes("sandy spring") &&
      property_type.length != 0) ||
    (!code_savage.includes(postal_input) &&
      location_input.includes("savage") &&
      property_type.length != 0) ||
    (!code_severn.includes(postal_input) &&
      location_input.includes("severn") &&
      property_type.length != 0) ||
    (!code_severna_park.includes(postal_input) &&
      location_input.includes("severna park") &&
      property_type.length != 0) ||
    (!code_shady_side.includes(postal_input) &&
      location_input.includes("shady side") &&
      property_type.length != 0) ||
    (!code_silver_spring.includes(postal_input) &&
      location_input.includes("silver spring") &&
      property_type.length != 0) ||
    (!code_simpsonville.includes(postal_input) &&
      location_input.includes("simpsonville") &&
      property_type.length != 0) ||
    (!code_spencerville.includes(postal_input) &&
      location_input.includes("spencerville") &&
      property_type.length != 0) ||
    (!code_suitland.includes(postal_input) &&
      location_input.includes("suitland") &&
      property_type.length != 0) ||
    (!code_takoma_park.includes(postal_input) &&
      location_input.includes("takoma park") &&
      property_type.length != 0) ||
    (!code_temple_hills.includes(postal_input) &&
      location_input.includes("temple hills") &&
      property_type.length != 0) ||
    (!code_tracys_landing.includes(postal_input) &&
      location_input.includes("tracys landing") &&
      property_type.length != 0) ||
    (!code_upper_marlboro.includes(postal_input) &&
      location_input.includes("upper marlboro") &&
      property_type.length != 0) ||
    (!code_washington_grove.includes(postal_input) &&
      location_input.includes("washington grove") &&
      property_type.length != 0) ||
    (!code_west_friendship.includes(postal_input) &&
      location_input.includes("west friendship") &&
      property_type.length != 0) ||
    (!code_west_river.includes(postal_input) &&
      location_input.includes("west river") &&
      property_type.length != 0) ||
    (!code_woodbine.includes(postal_input) &&
      location_input.includes("woodbine") &&
      property_type.length != 0) ||
    (!code_woodstock.includes(postal_input) &&
      location_input.includes("woodstock") &&
      property_type.length != 0) ||
    // RAVE
    (!code_austin.includes(postal_input) &&
      location_input.includes("austin") &&
      property_type.length != 0) ||
    (!code_bastrop.includes(postal_input) &&
      location_input.includes("bastrop") &&
      property_type.length != 0) ||
    (!code_buda.includes(postal_input) &&
      location_input.includes("buda") &&
      property_type.length != 0) ||
    (!code_cedar_creek.includes(postal_input) &&
      location_input.includes("cedar creek") &&
      property_type.length != 0) ||
    (!code_cedar_park.includes(postal_input) &&
      location_input.includes("cedar park") &&
      property_type.length != 0) ||
    (!code_corpus_christi.includes(postal_input) &&
      location_input.includes("corpus christi") &&
      property_type.length != 0) ||
    (!code_coupland.includes(postal_input) &&
      location_input.includes("coupland") &&
      property_type.length != 0) ||
    (!code_del_valle.includes(postal_input) &&
      location_input.includes("del valle") &&
      property_type.length != 0) ||
    (!code_dripping_srpings.includes(postal_input) &&
      location_input.includes("dripping springs") &&
      property_type.length != 0) ||
    (!code_elgin.includes(postal_input) &&
      location_input.includes("elgin") &&
      property_type.length != 0) ||
    (!code_florence.includes(postal_input) &&
      location_input.includes("florence") &&
      property_type.length != 0) ||
    (!code_georgetown.includes(postal_input) &&
      location_input.includes("georgetown") &&
      property_type.length != 0) ||
    (!code_harker_heights.includes(postal_input) &&
      location_input.includes("harker heights") &&
      property_type.length != 0) ||
    (!code_hutto.includes(postal_input) &&
      location_input.includes("hutto") &&
      property_type.length != 0) ||
    (!code_jarrell.includes(postal_input) &&
      location_input.includes("jarrell") &&
      property_type.length != 0) ||
    (!code_killeen.includes(postal_input) &&
      location_input.includes("killeen") &&
      property_type.length != 0) ||
    (!code_kyle.includes(postal_input) &&
      location_input.includes("kyle") &&
      property_type.length != 0) ||
    (!code_leander.includes(postal_input) &&
      location_input.includes("leander") &&
      property_type.length != 0) ||
    (!code_liberty_hill.includes(postal_input) &&
      location_input.includes("liberty hill") &&
      property_type.length != 0) ||
    (!code_manchaca.includes(postal_input) &&
      location_input.includes("manchaca") &&
      property_type.length != 0) ||
    (!code_manor.includes(postal_input) &&
      location_input.includes("manor") &&
      property_type.length != 0) ||
    (!code_pflugerville.includes(postal_input) &&
      location_input.includes("pflugerville") &&
      property_type.length != 0) ||
    (!code_roundrock.includes(postal_input) &&
      location_input.includes("round rock") &&
      property_type.length != 0) ||
    (!code_salado.includes(postal_input) &&
      location_input.includes("salado") &&
      property_type.length != 0) ||
    (!code_taylor.includes(postal_input) &&
      location_input.includes("taylor") &&
      property_type.length != 0) ||
    (!code_temple.includes(postal_input) &&
      location_input.includes("temple") &&
      property_type.length != 0) ||
    // COMPLETE
    (!code_alief.includes(postal_input) &&
      location_input.includes("alief") &&
      property_type.length != 0) ||
    (!code_alvin.includes(postal_input) &&
      location_input.includes("alvin") &&
      property_type.length != 0) ||
    (!code_angleton.includes(postal_input) &&
      location_input.includes("angleton") &&
      property_type.length != 0) ||
    (!code_bacliff.includes(postal_input) &&
      location_input.includes("bacliff") &&
      property_type.length != 0) ||
    (!code_barker.includes(postal_input) &&
      location_input.includes("barker") &&
      property_type.length != 0) ||
    (!code_baytown.includes(postal_input) &&
      location_input.includes("baytown") &&
      property_type.length != 0) ||
    (!code_bellaire.includes(postal_input) &&
      location_input.includes("bellaire") &&
      property_type.length != 0) ||
    (!code_channelview.includes(postal_input) &&
      location_input.includes("channelview") &&
      property_type.length != 0) ||
    (!code_conroe.includes(postal_input) &&
      location_input.includes("conroe") &&
      property_type.length != 0) ||
    (!code_crosby.includes(postal_input) &&
      location_input.includes("crosby") &&
      property_type.length != 0) ||
    (!code_cypress.includes(postal_input) &&
      location_input.includes("cypress") &&
      property_type.length != 0) ||
    (!code_deer_park.includes(postal_input) &&
      location_input.includes("deer park") &&
      property_type.length != 0) ||
    (!code_dickinson.includes(postal_input) &&
      location_input.includes("dickinson") &&
      property_type.length != 0) ||
    (!code_freeport.includes(postal_input) &&
      location_input.includes("freeport") &&
      property_type.length != 0) ||
    (!code_fresno.includes(postal_input) &&
      location_input.includes("fresno") &&
      property_type.length != 0) ||
    (!code_friendswood.includes(postal_input) &&
      location_input.includes("friendswood") &&
      property_type.length != 0) ||
    (!code_gelena_park.includes(postal_input) &&
      location_input.includes("gelena park") &&
      property_type.length != 0) ||
    (!code_hempstead.includes(postal_input) &&
      location_input.includes("hempstead") &&
      property_type.length != 0) ||
    (!code_highlands.includes(postal_input) &&
      location_input.includes("highlands") &&
      property_type.length != 0) ||
    (!code_hitchcock.includes(postal_input) &&
      location_input.includes("hitchcock") &&
      property_type.length != 0) ||
    (!code_houston.includes(postal_input) &&
      location_input.includes("houston") &&
      property_type.length != 0) ||
    (!code_huffman.includes(postal_input) &&
      location_input.includes("huffman") &&
      property_type.length != 0) ||
    (!code_humble.includes(postal_input) &&
      location_input.includes("humble") &&
      property_type.length != 0) ||
    (!code_katy.includes(postal_input) &&
      location_input.includes("katy") &&
      property_type.length != 0) ||
    (!code_kemah.includes(postal_input) &&
      location_input.includes("kemah") &&
      property_type.length != 0) ||
    (!code_kingwood.includes(postal_input) &&
      location_input.includes("kingwood") &&
      property_type.length != 0) ||
    (!code_la_marque.includes(postal_input) &&
      location_input.includes("la marque") &&
      property_type.length != 0) ||
    (!code_la_porte.includes(postal_input) &&
      location_input.includes("la porte") &&
      property_type.length != 0) ||
    (!code_league_city.includes(postal_input) &&
      location_input.includes("league city") &&
      property_type.length != 0) ||
    (!code_liverpool.includes(postal_input) &&
      location_input.includes("liverpool") &&
      property_type.length != 0) ||
    (!code_manvel.includes(postal_input) &&
      location_input.includes("manvel") &&
      property_type.length != 0) ||
    (!code_missouri_city.includes(postal_input) &&
      location_input.includes("missouri") &&
      property_type.length != 0) ||
    (!code_north_houston.includes(postal_input) &&
      location_input.includes("north houston") &&
      property_type.length != 0) ||
    (!code_pearland.includes(postal_input) &&
      location_input.includes("pearland") &&
      property_type.length != 0) ||
    (!code_porter.includes(postal_input) &&
      location_input.includes("porter") &&
      property_type.length != 0) ||
    (!code_rosenberg.includes(postal_input) &&
      location_input.includes("rosenberg") &&
      property_type.length != 0) ||
    (!code_rosharon.includes(postal_input) &&
      location_input.includes("rosharon") &&
      property_type.length != 0) ||
    (!code_santa_fe.includes(postal_input) &&
      location_input.includes("santa fe") &&
      property_type.length != 0) ||
    (!code_seabrook.includes(postal_input) &&
      location_input.includes("seabrook") &&
      property_type.length != 0) ||
    (!code_south_houston.includes(postal_input) &&
      location_input.includes("south houston") &&
      property_type.length != 0) ||
    (!code_spring.includes(postal_input) &&
      location_input.includes("spring") &&
      property_type.length != 0) ||
    (!code_stafford.includes(postal_input) &&
      location_input.includes("stafford") &&
      property_type.length != 0) ||
    (!code_sugar_land.includes(postal_input) &&
      location_input.includes("sugar land") &&
      property_type.length != 0) ||
    (!code_texas_city.includes(postal_input) &&
      location_input.includes("texas") &&
      property_type.length != 0) ||
    (!code_thompsons.includes(postal_input) &&
      location_input.includes("thompsons") &&
      property_type.length != 0) ||
    (!code_tomball.includes(postal_input) &&
      location_input.includes("tomball") &&
      property_type.length != 0) ||
    (!code_waller.includes(postal_input) &&
      location_input.includes("waller") &&
      property_type.length != 0) ||
    (!code_webster.includes(postal_input) &&
      location_input.includes("webster") &&
      property_type.length != 0) ||
    (!code_west_columbia.includes(postal_input) &&
      location_input.includes("west columbia") &&
      property_type.length != 0) ||
    // CREEKBEND
    (!code_charleston.includes(postal_input) &&
      location_input.includes("charleston") &&
      property_type.length != 0) ||
    (!code_folly_beach.includes(postal_input) &&
      location_input.includes("folly beach") &&
      property_type.length != 0) ||
    (!code_goose_creek.includes(postal_input) &&
      location_input.includes("goose creek") &&
      property_type.length != 0) ||
    (!code_hanahan.includes(postal_input) &&
      location_input.includes("hanahan") &&
      property_type.length != 0) ||
    (!code_isle_of_palms.includes(postal_input) &&
      location_input.includes("isle of palms") &&
      property_type.length != 0) ||
    (!code_isle_of_palms.includes(postal_input) &&
      location_input.includes("palms isle") &&
      property_type.length != 0) ||
    (!code_johns_island.includes(postal_input) &&
      location_input.includes("johns island") &&
      property_type.length != 0) ||
    (!code_ladson.includes(postal_input) &&
      location_input.includes("ladson") &&
      property_type.length != 0) ||
    (!code_moncks_corner.includes(postal_input) &&
      location_input.includes("moncks corner") &&
      property_type.length != 0) ||
    (!code_mount_pleasant.includes(postal_input) &&
      location_input.includes("mount pleasant") &&
      property_type.length != 0) ||
    (!code_mount_pleasant.includes(postal_input) &&
      location_input.includes("mt. pleasant") &&
      property_type.length != 0) ||
    (!code_north_charleston.includes(postal_input) &&
      location_input.includes("north charleston") &&
      property_type.length != 0) ||
    (!code_sullivan_island.includes(postal_input) &&
      location_input.includes("sullivans island") &&
      property_type.length != 0) ||
    (!code_summerville.includes(postal_input) &&
      location_input.includes("summerville") &&
      property_type.length != 0) ||
    // RADIUS
    (!code_annada.includes(postal_input) &&
      location_input.includes("annada") &&
      property_type.length != 0) ||
    (!code_augusta.includes(postal_input) &&
      location_input.includes("augusta") &&
      property_type.length != 0) ||
    (!code_ballwin.includes(postal_input) &&
      location_input.includes("ballwin") &&
      property_type.length != 0) ||
    (!code_barnhart.includes(postal_input) &&
      location_input.includes("barnhart") &&
      property_type.length != 0) ||
    (!code_beaufort.includes(postal_input) &&
      location_input.includes("beaufort") &&
      property_type.length != 0) ||
    (!code_bridgeton.includes(postal_input) &&
      location_input.includes("bridgeton") &&
      property_type.length != 0) ||
    (!code_catawissa.includes(postal_input) &&
      location_input.includes("catawissa") &&
      property_type.length != 0) ||
    (!code_cedar_hill.includes(postal_input) &&
      location_input.includes("cedar hill") &&
      property_type.length != 0) ||
    (!code_chesterfield.includes(postal_input) &&
      location_input.includes("chesterfield") &&
      property_type.length != 0) ||
    (!code_crystal_city.includes(postal_input) &&
      location_input.includes("crystal") &&
      property_type.length != 0) ||
    (!code_de_soto.includes(postal_input) &&
      location_input.includes("de soto") &&
      property_type.length != 0) ||
    (!code_defiance.includes(postal_input) &&
      location_input.includes("defiance") &&
      property_type.length != 0) ||
    (!code_dittmer.includes(postal_input) &&
      location_input.includes("dittmer") &&
      property_type.length != 0) ||
    (!code_dutzow.includes(postal_input) &&
      location_input.includes("dutzow") &&
      property_type.length != 0) ||
    (!code_earth_city.includes(postal_input) &&
      location_input.includes("earth city") &&
      property_type.length != 0) ||
    (!code_elsberry.includes(postal_input) &&
      location_input.includes("elsberry") &&
      property_type.length != 0) ||
    (!code_eolia.includes(postal_input) &&
      location_input.includes("eolia") &&
      property_type.length != 0) ||
    (!code_eureka.includes(postal_input) &&
      location_input.includes("eureka") &&
      property_type.length != 0) ||
    (!code_fenton.includes(postal_input) &&
      location_input.includes("fenton") &&
      property_type.length != 0) ||
    (!code_festus.includes(postal_input) &&
      location_input.includes("festus") &&
      property_type.length != 0) ||
    (!code_fletcher.includes(postal_input) &&
      location_input.includes("fletcher") &&
      property_type.length != 0) ||
    (!code_flinthill.includes(postal_input) &&
      location_input.includes("flinthill") &&
      property_type.length != 0) ||
    (!code_florissant.includes(postal_input) &&
      location_input.includes("florissant") &&
      property_type.length != 0) ||
    (!code_foley.includes(postal_input) &&
      location_input.includes("foley") &&
      property_type.length != 0) ||
    (!code_foristell.includes(postal_input) &&
      location_input.includes("foristell") &&
      property_type.length != 0) ||
    (!code_french_village.includes(postal_input) &&
      location_input.includes("french village") &&
      property_type.length != 0) ||
    (!code_gerald.includes(postal_input) &&
      location_input.includes("gerald") &&
      property_type.length != 0) ||
    (!code_glencoe.includes(postal_input) &&
      location_input.includes("glencoe") &&
      property_type.length != 0) ||
    (!code_gray_summit.includes(postal_input) &&
      location_input.includes("gray summit") &&
      property_type.length != 0) ||
    (!code_grover.includes(postal_input) &&
      location_input.includes("grover") &&
      property_type.length != 0) ||
    (!code_grubville.includes(postal_input) &&
      location_input.includes("grubville") &&
      property_type.length != 0) ||
    (!code_hawk_point.includes(postal_input) &&
      location_input.includes("hawk point") &&
      property_type.length != 0) ||
    (!code_hazelwood.includes(postal_input) &&
      location_input.includes("hazelwood") &&
      property_type.length != 0) ||
    (!code_herculaneum.includes(postal_input) &&
      location_input.includes("herculaneum") &&
      property_type.length != 0) ||
    (!code_high_hill.includes(postal_input) &&
      location_input.includes("high hill") &&
      property_type.length != 0) ||
    (!code_high_ridge.includes(postal_input) &&
      location_input.includes("high ridge") &&
      property_type.length != 0) ||
    (!code_hillsboro.includes(postal_input) &&
      location_input.includes("hillsboro") &&
      property_type.length != 0) ||
    (!code_house_springs.includes(postal_input) &&
      location_input.includes("house springs") &&
      property_type.length != 0) ||
    (!code_imperial.includes(postal_input) &&
      location_input.includes("imperial") &&
      property_type.length != 0) ||
    (!code_jonesburg.includes(postal_input) &&
      location_input.includes("jonesburg") &&
      property_type.length != 0) ||
    (!code_kimmswick.includes(postal_input) &&
      location_input.includes("kimmswick") &&
      property_type.length != 0) ||
    (!code_labadie.includes(postal_input) &&
      location_input.includes("labadie") &&
      property_type.length != 0) ||
    (!code_lake_saint_louis.includes(postal_input) &&
      location_input.includes("lake saint louis") &&
      property_type.length != 0) ||
    (!code_leslie.includes(postal_input) &&
      location_input.includes("leslie") &&
      property_type.length != 0) ||
    (!code_liguori.includes(postal_input) &&
      location_input.includes("liguori") &&
      property_type.length != 0) ||
    (!code_lonedell.includes(postal_input) &&
      location_input.includes("lonedell") &&
      property_type.length != 0) ||
    (!code_luebbering.includes(postal_input) &&
      location_input.includes("luebbering") &&
      property_type.length != 0) ||
    (!code_mapaville.includes(postal_input) &&
      location_input.includes("mapaville") &&
      property_type.length != 0) ||
    (!code_marthasville.includes(postal_input) &&
      location_input.includes("marthasville") &&
      property_type.length != 0) ||
    (!code_maryland_heights.includes(postal_input) &&
      location_input.includes("maryland heights") &&
      property_type.length != 0) ||
    (!code_montgomery_city.includes(postal_input) &&
      location_input.includes("montgomery") &&
      property_type.length != 0) ||
    (!code_moscow_mills.includes(postal_input) &&
      location_input.includes("moscow mills") &&
      property_type.length != 0) ||
    (!code_new_florence.includes(postal_input) &&
      location_input.includes("new florence") &&
      property_type.length != 0) ||
    (!code_new_haven.includes(postal_input) &&
      location_input.includes("new haven") &&
      property_type.length != 0) ||
    (!code_new_melle.includes(postal_input) &&
      location_input.includes("new melle") &&
      property_type.length != 0) ||
    (!code_o_fallon.includes(postal_input) &&
      location_input.includes("o'fallon") &&
      property_type.length != 0) ||
    (!code_old_monroe.includes(postal_input) &&
      location_input.includes("old monroe") &&
      property_type.length != 0) ||
    (!code_pacific.includes(postal_input) &&
      location_input.includes("pacific") &&
      property_type.length != 0) ||
    (!code_pevely.includes(postal_input) &&
      location_input.includes("pevely") &&
      property_type.length != 0) ||
    (!code_portage_des_sioux.includes(postal_input) &&
      location_input.includes("portage des sioux") &&
      property_type.length != 0) ||
    (!code_richwoods.includes(postal_input) &&
      location_input.includes("richwoods") &&
      property_type.length != 0) ||
    (!code_robertsville.includes(postal_input) &&
      location_input.includes("robertsville") &&
      property_type.length != 0) ||
    (!code_saint_albans.includes(postal_input) &&
      location_input.includes("saint albans") &&
      property_type.length != 0) ||
    (!code_saint_albans.includes(postal_input) &&
      location_input.includes("st. albans") &&
      property_type.length != 0) ||
    (!code_saint_ann.includes(postal_input) &&
      location_input.includes("saint ann") &&
      property_type.length != 0) ||
    (!code_saint_ann.includes(postal_input) &&
      location_input.includes("st. ann") &&
      property_type.length != 0) ||
    (!code_saint_charles.includes(postal_input) &&
      location_input.includes("saint charles") &&
      property_type.length != 0) ||
    (!code_saint_charles.includes(postal_input) &&
      location_input.includes("st. charles") &&
      property_type.length != 0) ||
    (!code_saint_clair.includes(postal_input) &&
      location_input.includes("saint clair") &&
      property_type.length != 0) ||
    (!code_saint_clair.includes(postal_input) &&
      location_input.includes("st. claire") &&
      property_type.length != 0) ||
    (!code_saint_louis.includes(postal_input) &&
      location_input.includes("saint louis") &&
      property_type.length != 0) ||
    (!code_saint_louis.includes(postal_input) &&
      location_input.includes("st. louis") &&
      property_type.length != 0) ||
    (!code_saint_peters.includes(postal_input) &&
      location_input.includes("saint peters") &&
      property_type.length != 0) ||
    (!code_saint_peters.includes(postal_input) &&
      location_input.includes("st. peters") &&
      property_type.length != 0) ||
    (!code_silex.includes(postal_input) &&
      location_input.includes("silex") &&
      property_type.length != 0) ||
    (!code_stanton.includes(postal_input) &&
      location_input.includes("stanton") &&
      property_type.length != 0) ||
    (!code_sullivan.includes(postal_input) &&
      location_input.includes("sullivan") &&
      property_type.length != 0) ||
    (!code_troy.includes(postal_input) &&
      location_input.includes("troy") &&
      property_type.length != 0) ||
    (!code_truxton.includes(postal_input) &&
      location_input.includes("truxton") &&
      property_type.length != 0) ||
    (!code_union.includes(postal_input) &&
      location_input.includes("union") &&
      property_type.length != 0) ||
    (!code_valles_mines.includes(postal_input) &&
      location_input.includes("valles mines") &&
      property_type.length != 0) ||
    (!code_valley_park.includes(postal_input) &&
      location_input.includes("valley park") &&
      property_type.length != 0) ||
    (!code_villa_ridge.includes(postal_input) &&
      location_input.includes("villa ridge") &&
      property_type.length != 0) ||
    (!code_warrenton.includes(postal_input) &&
      location_input.includes("warrenton") &&
      property_type.length != 0) ||
    (!code_washington.includes(postal_input) &&
      location_input.includes("washington") &&
      property_type.length != 0) ||
    (!code_wentzville.includes(postal_input) &&
      location_input.includes("wentzville") &&
      property_type.length != 0) ||
    (!code_west_alton.includes(postal_input) &&
      location_input.includes("west alton") &&
      property_type.length != 0) ||
    (!code_whiteside.includes(postal_input) &&
      location_input.includes("whiteside") &&
      property_type.length != 0) ||
    (!code_winfield.includes(postal_input) &&
      location_input.includes("winfield") &&
      property_type.length != 0) ||
    (!code_wright_city.includes(postal_input) &&
      location_input.includes("wright city") &&
      property_type.length != 0) ||
    //rentsafe
    (!code_apex.includes(postal_input) &&
      location_input.includes("apex") &&
      property_type.length != 0) ||
    (!code_cary.includes(postal_input) &&
      location_input.includes("cary") &&
      property_type.length != 0) ||
    (!code_chapel_hill.includes(postal_input) &&
      location_input.includes("chapel hill") &&
      property_type.length != 0) ||
    (!code_clayton.includes(postal_input) &&
      location_input.includes("clayton") &&
      property_type.length != 0) ||
    (!code_durham.includes(postal_input) &&
      location_input.includes("durham") &&
      property_type.length != 0) ||
    (!code_fuquay_varina.includes(postal_input) &&
      location_input.includes("fuquay varina") &&
      property_type.length != 0) ||
    (!code_fuquay_varina.includes(postal_input) &&
      location_input.includes("fuquay-varina") &&
      property_type.length != 0) ||
    (!code_garner.includes(postal_input) &&
      location_input.includes("garner") &&
      property_type.length != 0) ||
    (!code_holly_springs.includes(postal_input) &&
      location_input.includes("holly springs") &&
      property_type.length != 0) ||
    (!code_knightdale.includes(postal_input) &&
      location_input.includes("knightdale") &&
      property_type.length != 0) ||
    (!code_moncure.includes(postal_input) &&
      location_input.includes("moncure") &&
      property_type.length != 0) ||
    (!code_morrisville.includes(postal_input) &&
      location_input.includes("morrisville") &&
      property_type.length != 0) ||
    (!code_new_hill.includes(postal_input) &&
      location_input.includes("new hill") &&
      property_type.length != 0) ||
    (!code_raleigh.includes(postal_input) &&
      location_input.includes("raleigh") &&
      property_type.length != 0) ||
    (!code_rolesville.includes(postal_input) &&
      location_input.includes("rolesville") &&
      property_type.length != 0) ||
    (!code_wake_forest.includes(postal_input) &&
      location_input.includes("wake forest") &&
      property_type.length != 0) ||
    (!code_wendell.includes(postal_input) &&
      location_input.includes("wendell") &&
      property_type.length != 0) ||
    (!code_willow_spring.includes(postal_input) &&
      location_input.includes("willow spring") &&
      property_type.length != 0) ||
    (!code_zebulon.includes(postal_input) && location_input.includes("zebulon"))
  ) {
    modal_mismatch.style.display = "block";
  } else if (
    // Major
    (!code_portland.includes(postal_input) &&
      !location_input.includes("portland") &&
      property_type.length != 0) ||
    (!code_eugene.includes(postal_input) &&
      !location_input.includes("eugene") &&
      property_type.length != 0) ||
    (!code_nashville.includes(postal_input) &&
      !location_input.includes("nashville") &&
      property_type.length != 0) ||
    (!code_antelope.includes(postal_input) &&
      !location_input.includes("antelope") &&
      property_type.length != 0) ||
    (!code_carmichael.includes(postal_input) &&
      !location_input.includes("carmichael") &&
      property_type.length != 0) ||
    (!code_citrus_heights.includes(postal_input) &&
      !location_input.includes("citrus heights") &&
      property_type.length != 0) ||
    (!code_clarksburg.includes(postal_input) &&
      !location_input.includes("clarksburg") &&
      property_type.length != 0) ||
    (!code_davis.includes(postal_input) &&
      !location_input.includes("davis") &&
      property_type.length != 0) ||
    (!code_el_dorado_hills.includes(postal_input) &&
      !location_input.includes("el dorado") &&
      property_type.length != 0) ||
    (!code_elk_grove.includes(postal_input) &&
      !location_input.includes("elk grove") &&
      property_type.length != 0) ||
    (!code_elverta.includes(postal_input) &&
      !location_input.includes("elverta") &&
      property_type.length != 0) ||
    (!code_fair_oaks.includes(postal_input) &&
      !location_input.includes("fair oaks") &&
      property_type.length != 0) ||
    (!code_folsom.includes(postal_input) &&
      !location_input.includes("folsom") &&
      property_type.length != 0) ||
    (!code_granite_bay.includes(postal_input) &&
      !location_input.includes("granite bay") &&
      property_type.length != 0) ||
    (!code_hood.includes(postal_input) &&
      !location_input.includes("hood") &&
      property_type.length != 0) ||
    (!code_mather.includes(postal_input) &&
      !location_input.includes("mather") &&
      property_type.length != 0) ||
    (!code_mcclellan.includes(postal_input) &&
      !location_input.includes("mcclellan") &&
      property_type.length != 0) ||
    (!code_north_highlands.includes(postal_input) &&
      !location_input.includes("north highlands") &&
      property_type.length != 0) ||
    (!code_orangevale.includes(postal_input) &&
      !location_input.includes("orangevale") &&
      property_type.length != 0) ||
    (!code_rancho_cordova.includes(postal_input) &&
      !location_input.includes("rancho cordova") &&
      property_type.length != 0) ||
    (!code_represa.includes(postal_input) &&
      !location_input.includes("represa") &&
      property_type.length != 0) ||
    (!code_rescue.includes(postal_input) &&
      !location_input.includes("rescue") &&
      property_type.length != 0) ||
    (!code_rio_linda.includes(postal_input) &&
      !location_input.includes("rio linda") &&
      property_type.length != 0) ||
    (!code_rocklin.includes(postal_input) &&
      !location_input.includes("rocklin") &&
      property_type.length != 0) ||
    (!code_roseville.includes(postal_input) &&
      !location_input.includes("rosevill") &&
      property_type.length != 0) ||
    (!code_sacramento.includes(postal_input) &&
      !location_input.includes("sacramento") &&
      property_type.length != 0) ||
    (!code_west_sacramento.includes(postal_input) &&
      !location_input.includes("west sacramento") &&
      property_type.length != 0) ||
    (!code_woodland.includes(postal_input) &&
      !location_input.includes("woodland") &&
      property_type.length != 0) ||
    (!code_yolo.includes(postal_input) &&
      !location_input.includes("yolo") &&
      property_type.length != 0) ||
    (!code_bellevue.includes(postal_input) &&
      !location_input.includes("bellevue") &&
      property_type.length != 0) ||
    (!code_bothel.includes(postal_input) &&
      !location_input.includes("bothel") &&
      property_type.length != 0) ||
    (!code_edmonds.includes(postal_input) &&
      !location_input.includes("edmonds") &&
      property_type.length != 0) ||
    (!code_everett.includes(postal_input) &&
      !location_input.includes("everett") &&
      property_type.length != 0) ||
    (!code_issaquah.includes(postal_input) &&
      !location_input.includes("issaquah") &&
      property_type.length != 0) ||
    (!code_kenmore.includes(postal_input) &&
      !location_input.includes("kenmore") &&
      property_type.length != 0) ||
    (!code_kent.includes(postal_input) &&
      !location_input.includes("kent") &&
      property_type.length != 0) ||
    (!code_kirkland.includes(postal_input) &&
      !location_input.includes("kirkland") &&
      property_type.length != 0) ||
    (!code_lynnwood.includes(postal_input) &&
      !location_input.includes("lynnwood") &&
      property_type.length != 0) ||
    (!code_medina.includes(postal_input) &&
      !location_input.includes("medina") &&
      property_type.length != 0) ||
    (!code_mercer_island.includes(postal_input) &&
      !location_input.includes("mercer") &&
      property_type.length != 0) ||
    (!code_mill_creek.includes(postal_input) &&
      !location_input.includes("mill creek") &&
      property_type.length != 0) ||
    (!code_mountlake_terrace.includes(postal_input) &&
      !location_input.includes("mountlake terrace") &&
      property_type.length != 0) ||
    (!code_mukilteo.includes(postal_input) &&
      !location_input.includes("mukilteo") &&
      property_type.length != 0) ||
    (!code_redmond.includes(postal_input) &&
      !location_input.includes("redmond") &&
      property_type.length != 0) ||
    (!code_renton.includes(postal_input) &&
      !location_input.includes("renton") &&
      property_type.length != 0) ||
    (!code_sammamish.includes(postal_input) &&
      !location_input.includes("sammamish") &&
      property_type.length != 0) ||
    (!code_seahurst.includes(postal_input) &&
      !location_input.includes("seahurst") &&
      property_type.length != 0) ||
    (!code_seattle.includes(postal_input) &&
      !location_input.includes("seattle") &&
      property_type.length != 0) ||
    (!code_alhambra.includes(postal_input) &&
      !location_input.includes("alhambra") &&
      property_type.length != 0) ||
    (!code_altadena.includes(postal_input) &&
      !location_input.includes("altadena") &&
      property_type.length != 0) ||
    (!code_arcadia.includes(postal_input) &&
      !location_input.includes("arcadia") &&
      property_type.length != 0) ||
    (!code_bell.includes(postal_input) &&
      !location_input.includes("bell") &&
      property_type.length != 0) ||
    (!code_bell_gardens.includes(postal_input) &&
      !location_input.includes("bell gardens") &&
      property_type.length != 0) ||
    (!code_bellflower.includes(postal_input) &&
      !location_input.includes("bellflower") &&
      property_type.length != 0) ||
    (!code_beverly_hills.includes(postal_input) &&
      !location_input.includes("beverly hills") &&
      property_type.length != 0) ||
    (!code_burbank.includes(postal_input) &&
      !location_input.includes("burbank") &&
      property_type.length != 0) ||
    (!code_canoga_park.includes(postal_input) &&
      !location_input.includes("canoga park") &&
      property_type.length != 0) ||
    (!code_carson.includes(postal_input) &&
      !location_input.includes("carson") &&
      property_type.length != 0) ||
    (!code_chatsworth.includes(postal_input) &&
      !location_input.includes("chatsworth") &&
      property_type.length != 0) ||
    (!code_city_of_industry.includes(postal_input) &&
      !location_input.includes("city of industry") &&
      property_type.length != 0) ||
    (!code_compton.includes(postal_input) &&
      !location_input.includes("compton") &&
      property_type.length != 0) ||
    (!code_culver_city.includes(postal_input) &&
      !location_input.includes("culver") &&
      property_type.length != 0) ||
    (!code_dodgertown.includes(postal_input) &&
      !location_input.includes("dodgertown") &&
      property_type.length != 0) ||
    (!code_downey.includes(postal_input) &&
      !location_input.includes("downey") &&
      property_type.length != 0) ||
    (!code_duarte.includes(postal_input) &&
      !location_input.includes("duarte") &&
      property_type.length != 0) ||
    (!code_el_monte.includes(postal_input) &&
      !location_input.includes("el monte") &&
      property_type.length != 0) ||
    (!code_el_segundo.includes(postal_input) &&
      !location_input.includes("el segundo") &&
      property_type.length != 0) ||
    (!code_gardena.includes(postal_input) &&
      !location_input.includes("gardena") &&
      property_type.length != 0) ||
    (!code_glendale.includes(postal_input) &&
      !location_input.includes("glendale") &&
      property_type.length != 0) ||
    (!code_granada_hills.includes(postal_input) &&
      !location_input.includes("granada hills") &&
      property_type.length != 0) ||
    (!code_harbor_city.includes(postal_input) &&
      !location_input.includes("harbor") &&
      property_type.length != 0) ||
    (!code_hawthorne.includes(postal_input) &&
      !location_input.includes("hawthorne") &&
      property_type.length != 0) ||
    (!code_hermosa_beach.includes(postal_input) &&
      !location_input.includes("hermosa beach") &&
      property_type.length != 0) ||
    (!code_huntington_park.includes(postal_input) &&
      !location_input.includes("huntington park") &&
      property_type.length != 0) ||
    (!code_inglewood.includes(postal_input) &&
      !location_input.includes("inglewood") &&
      property_type.length != 0) ||
    (!code_la_cañada_flintridge.includes(postal_input) &&
      !location_input.includes("la cañada flintridge") &&
      property_type.length != 0) ||
    (!code_la_crescenta.includes(postal_input) &&
      !location_input.includes("la crescenta") &&
      property_type.length != 0) ||
    (!code_lakewood.includes(postal_input) &&
      !location_input.includes("lakewood") &&
      property_type.length != 0) ||
    (!code_lawndale.includes(postal_input) &&
      !location_input.includes("lawndale") &&
      property_type.length != 0) ||
    (!code_lomita.includes(postal_input) &&
      !location_input.includes("lomita") &&
      property_type.length != 0) ||
    (!code_long_beach.includes(postal_input) &&
      !location_input.includes("long beach") &&
      property_type.length != 0) ||
    (!code_los_angeles.includes(postal_input) &&
      !location_input.includes("los angeles") &&
      property_type.length != 0) ||
    (!code_lynwood.includes(postal_input) &&
      !location_input.includes("lynwood") &&
      property_type.length != 0) ||
    (!code_manhattan_beach.includes(postal_input) &&
      !location_input.includes("manhattan beach") &&
      property_type.length != 0) ||
    (!code_marina_del_rey.includes(postal_input) &&
      !location_input.includes("marina del rey") &&
      property_type.length != 0) ||
    (!code_maywood.includes(postal_input) &&
      !location_input.includes("maywood") &&
      property_type.length != 0) ||
    (!code_mission_hills.includes(postal_input) &&
      !location_input.includes("mission hills") &&
      property_type.length != 0) ||
    (!code_monrovia.includes(postal_input) &&
      !location_input.includes("monrovia") &&
      property_type.length != 0) ||
    (!code_montebello.includes(postal_input) &&
      !location_input.includes("montebello") &&
      property_type.length != 0) ||
    (!code_monterey_park.includes(postal_input) &&
      !location_input.includes("monterey park") &&
      property_type.length != 0) ||
    (!code_montrose.includes(postal_input) &&
      !location_input.includes("montrose") &&
      property_type.length != 0) ||
    (!code_north_hills.includes(postal_input) &&
      !location_input.includes("north hills") &&
      property_type.length != 0) ||
    (!code_north_hollywood.includes(postal_input) &&
      !location_input.includes("hollywood") &&
      property_type.length != 0) ||
    (!code_northridge.includes(postal_input) &&
      !location_input.includes("northridge") &&
      property_type.length != 0) ||
    (!code_pacoima.includes(postal_input) &&
      !location_input.includes("pacoima") &&
      property_type.length != 0) ||
    (!code_palos_verdes_peninsula.includes(postal_input) &&
      !location_input.includes("palos verdes") &&
      property_type.length != 0) ||
    (!code_panorama_city.includes(postal_input) &&
      !location_input.includes("panorama") &&
      property_type.length != 0) ||
    (!code_paramount.includes(postal_input) &&
      !location_input.includes("paramount") &&
      property_type.length != 0) ||
    (!code_pasadena.includes(postal_input) &&
      !location_input.includes("pasadena") &&
      property_type.length != 0) ||
    (!code_pico_rivera.includes(postal_input) &&
      !location_input.includes("pico rivera") &&
      property_type.length != 0) ||
    (!code_playa_del_rey.includes(postal_input) &&
      !location_input.includes("playa del rey") &&
      property_type.length != 0) ||
    (!code_porter_ranch.includes(postal_input) &&
      !location_input.includes("porter ranch") &&
      property_type.length != 0) ||
    (!code_rancho_palos_verdes.includes(postal_input) &&
      !location_input.includes("rancho palos verdes") &&
      property_type.length != 0) ||
    (!code_redondo_beach.includes(postal_input) &&
      !location_input.includes("redondo beach") &&
      property_type.length != 0) ||
    (!code_reseda.includes(postal_input) &&
      !location_input.includes("reseda") &&
      property_type.length != 0) ||
    (!code_rosemead.includes(postal_input) &&
      !location_input.includes("rosemead") &&
      property_type.length != 0) ||
    (!code_san_fernando.includes(postal_input) &&
      !location_input.includes("san fernando") &&
      property_type.length != 0) ||
    (!code_san_gabriel.includes(postal_input) &&
      !location_input.includes("san gabriel") &&
      property_type.length != 0) ||
    (!code_san_marino.includes(postal_input) &&
      !location_input.includes("san marino") &&
      property_type.length != 0) ||
    (!code_san_pedro.includes(postal_input) &&
      !location_input.includes("san pedro") &&
      property_type.length != 0) ||
    (!code_santa_monica.includes(postal_input) &&
      !location_input.includes("santa monica") &&
      property_type.length != 0) ||
    (!code_sierra_madre.includes(postal_input) &&
      !location_input.includes("sierra madre") &&
      property_type.length != 0) ||
    (!code_signal_hill.includes(postal_input) &&
      !location_input.includes("signal hill") &&
      property_type.length != 0) ||
    (!code_south_el_monte.includes(postal_input) &&
      !location_input.includes("south el monte") &&
      property_type.length != 0) ||
    (!code_south_gate.includes(postal_input) &&
      !location_input.includes("south gate") &&
      property_type.length != 0) ||
    (!code_south_pasadena.includes(postal_input) &&
      !location_input.includes("south pasadena") &&
      property_type.length != 0) ||
    (!code_studio_city.includes(postal_input) &&
      !location_input.includes("studio") &&
      property_type.length != 0) ||
    (!code_sun_valley.includes(postal_input) &&
      !location_input.includes("sun valley") &&
      property_type.length != 0) ||
    (!code_sylmar.includes(postal_input) &&
      !location_input.includes("sylmar") &&
      property_type.length != 0) ||
    (!code_tarzana.includes(postal_input) &&
      !location_input.includes("tarzana") &&
      property_type.length != 0) ||
    (!code_temple_city.includes(postal_input) &&
      !location_input.includes("temple") &&
      property_type.length != 0) ||
    (!code_toluca_lake.includes(postal_input) &&
      !location_input.includes("toluca lake") &&
      property_type.length != 0) ||
    (!code_torrance.includes(postal_input) &&
      !location_input.includes("torrance") &&
      property_type.length != 0) ||
    (!code_tujunga.includes(postal_input) &&
      !location_input.includes("tujunga") &&
      property_type.length != 0) ||
    (!code_universal_city.includes(postal_input) &&
      !location_input.includes("universal") &&
      property_type.length != 0) ||
    (!code_valencia.includes(postal_input) &&
      !location_input.includes("valencia") &&
      property_type.length != 0) ||
    (!code_valley_village.includes(postal_input) &&
      !location_input.includes("valley village") &&
      property_type.length != 0) ||
    (!code_van_nuys.includes(postal_input) &&
      !location_input.includes("van nuys") &&
      property_type.length != 0) ||
    (!code_venice.includes(postal_input) &&
      !location_input.includes("venice") &&
      property_type.length != 0) ||
    (!code_verdugo_city.includes(postal_input) &&
      !location_input.includes("verdugo") &&
      property_type.length != 0) ||
    (!code_west_hills.includes(postal_input) &&
      !location_input.includes("west hills") &&
      property_type.length != 0) ||
    (!code_west_hollywood.includes(postal_input) &&
      !location_input.includes("west hollywood") &&
      property_type.length != 0) ||
    (!code_wilmington.includes(postal_input) &&
      !location_input.includes("wilmington") &&
      property_type.length != 0) ||
    (!code_winnetka.includes(postal_input) &&
      !location_input.includes("winnetka") &&
      property_type.length != 0) ||
    (!code_woodland_hills.includes(postal_input) &&
      !location_input.includes("woodland hills") &&
      property_type.length != 0) ||
    (!code_alameda.includes(postal_input) &&
      !location_input.includes("alameda") &&
      property_type.length != 0) ||
    (!code_alamo.includes(postal_input) &&
      !location_input.includes("alamo") &&
      property_type.length != 0) ||
    (!code_albany.includes(postal_input) &&
      !location_input.includes("albany") &&
      property_type.length != 0) ||
    (!code_alviso.includes(postal_input) &&
      !location_input.includes("alviso") &&
      property_type.length != 0) ||
    (!code_antioch.includes(postal_input) &&
      !location_input.includes("antioch") &&
      property_type.length != 0) ||
    (!code_atherton.includes(postal_input) &&
      !location_input.includes("atherton") &&
      property_type.length != 0) ||
    (!postal_input.includes(code_belmont) &&
      !location_input.includes("belmont") &&
      property_type.length != 0) ||
    (!code_belvedere_tiburon.includes(postal_input) &&
      !location_input.includes("tiburon") &&
      property_type.length != 0) ||
    (!code_berkeley.includes(postal_input) &&
      !location_input.includes("berkeley") &&
      property_type.length != 0) ||
    (!code_brentwood.includes(postal_input) &&
      !location_input.includes("brentwood") &&
      property_type.length != 0) ||
    (!postal_input.includes(code_brisbane) &&
      !location_input.includes("brisbane") &&
      property_type.length != 0) ||
    (!code_burlingame.includes(postal_input) &&
      !location_input.includes("burlingame") &&
      property_type.length != 0) ||
    (!code_byron.includes(postal_input) &&
      !location_input.includes("byron") &&
      property_type.length != 0) ||
    (!code_campbell.includes(postal_input) &&
      !location_input.includes("campbell") &&
      property_type.length != 0) ||
    (!code_canyon.includes(postal_input) &&
      !location_input.includes("canyon") &&
      property_type.length != 0) ||
    (!code_capitola.includes(postal_input) &&
      !location_input.includes("capitola") &&
      property_type.length != 0) ||
    (!code_castro_valley.includes(postal_input) &&
      !location_input.includes("castro valley") &&
      property_type.length != 0) ||
    (!code_clayton.includes(postal_input) &&
      !location_input.includes("clayton") &&
      property_type.length != 0) ||
    (!code_concord.includes(postal_input) &&
      !location_input.includes("concord") &&
      property_type.length != 0) ||
    (!code_corte_madera.includes(postal_input) &&
      !location_input.includes("corte madera") &&
      property_type.length != 0) ||
    (!code_coyote.includes(postal_input) &&
      !location_input.includes("coyote") &&
      property_type.length != 0) ||
    (!code_crockett.includes(postal_input) &&
      !location_input.includes("crockett") &&
      property_type.length != 0) ||
    (!code_cupertino.includes(postal_input) &&
      !location_input.includes("cupertino") &&
      property_type.length != 0) ||
    (!code_daly_city.includes(postal_input) &&
      !location_input.includes("daly") &&
      property_type.length != 0) ||
    (!code_danville.includes(postal_input) &&
      !location_input.includes("danville") &&
      property_type.length != 0) ||
    (!code_diablo.includes(postal_input) &&
      !location_input.includes("diablo") &&
      property_type.length != 0) ||
    (!code_dublin.includes(postal_input) &&
      !location_input.includes("dublin") &&
      property_type.length != 0) ||
    (!code_el_cerrito.includes(postal_input) &&
      !location_input.includes("el cerrito") &&
      property_type.length != 0) ||
    (!code_el_granada.includes(postal_input) &&
      !location_input.includes("el granada") &&
      property_type.length != 0) ||
    (!code_el_sobrante.includes(postal_input) &&
      !location_input.includes("el sobrante") &&
      property_type.length != 0) ||
    (!code_emeryville.includes(postal_input) &&
      !location_input.includes("emeryville") &&
      property_type.length != 0) ||
    (!code_fremont.includes(postal_input) &&
      !location_input.includes("fremont") &&
      property_type.length != 0) ||
    (!code_gilroy.includes(postal_input) &&
      !location_input.includes("gilroy") &&
      property_type.length != 0) ||
    (!code_greenbrae.includes(postal_input) &&
      !location_input.includes("greenbrae") &&
      property_type.length != 0) ||
    (!code_half_moon_bay.includes(postal_input) &&
      !location_input.includes("half moon bay") &&
      property_type.length != 0) ||
    (!code_hayward.includes(postal_input) &&
      !location_input.includes("hayward") &&
      property_type.length != 0) ||
    (!code_hercules.includes(postal_input) &&
      !location_input.includes("hercules") &&
      property_type.length != 0) ||
    (!code_kentfield.includes(postal_input) &&
      !location_input.includes("kentfield") &&
      property_type.length != 0) ||
    (!code_lafayette.includes(postal_input) &&
      !location_input.includes("lafayette") &&
      property_type.length != 0) ||
    (!code_larkspur.includes(postal_input) &&
      !location_input.includes("larkspur") &&
      property_type.length != 0) ||
    (!code_livermore.includes(postal_input) &&
      !location_input.includes("livermore") &&
      property_type.length != 0) ||
    (!code_los_altos.includes(postal_input) &&
      !location_input.includes("los altos") &&
      property_type.length != 0) ||
    (!code_los_gatos.includes(postal_input) &&
      !location_input.includes("los gatos") &&
      property_type.length != 0) ||
    (!code_martinez.includes(postal_input) &&
      !location_input.includes("martinez") &&
      property_type.length != 0) ||
    (!code_menlo_park.includes(postal_input) &&
      !location_input.includes("menlo park") &&
      property_type.length != 0) ||
    (!code_mill_valley.includes(postal_input) &&
      !location_input.includes("mill valley") &&
      property_type.length != 0) ||
    (!code_millbrae.includes(postal_input) &&
      !location_input.includes("millbrae") &&
      property_type.length != 0) ||
    (!code_milpitas.includes(postal_input) &&
      !location_input.includes("milpitas") &&
      property_type.length != 0) ||
    (!code_montara.includes(postal_input) &&
      !location_input.includes("montara") &&
      property_type.length != 0) ||
    (!code_moraga.includes(postal_input) &&
      !location_input.includes("moraga") &&
      property_type.length != 0) ||
    (!code_morgan_hill.includes(postal_input) &&
      !location_input.includes("morgan hill") &&
      property_type.length != 0) ||
    (!code_moss_beach.includes(postal_input) &&
      !location_input.includes("moss beach") &&
      property_type.length != 0) ||
    (!code_mountain_view.includes(postal_input) &&
      !location_input.includes("mountain view") &&
      property_type.length != 0) ||
    (!code_newark.includes(postal_input) &&
      !location_input.includes("newark") &&
      property_type.length != 0) ||
    (!code_oakland.includes(postal_input) &&
      !location_input.includes("oakland") &&
      property_type.length != 0) ||
    (!code_orinda.includes(postal_input) &&
      !location_input.includes("orinda") &&
      property_type.length != 0) ||
    (!code_pacifica.includes(postal_input) &&
      !location_input.includes("pacifica") &&
      property_type.length != 0) ||
    (!code_palo_alto.includes(postal_input) &&
      !location_input.includes("palo alto") &&
      property_type.length != 0) ||
    (!code_piedmont.includes(postal_input) &&
      !location_input.includes("piedmont") &&
      property_type.length != 0) ||
    (!code_pinole.includes(postal_input) &&
      !location_input.includes("pinole") &&
      property_type.length != 0) ||
    (!code_pittsburg.includes(postal_input) &&
      !location_input.includes("pittsburg") &&
      property_type.length != 0) ||
    (!code_pleasant_hill.includes(postal_input) &&
      !location_input.includes("pleasant hill") &&
      property_type.length != 0) ||
    (!code_pleasanton.includes(postal_input) &&
      !location_input.includes("pleasanton") &&
      property_type.length != 0) ||
    (!code_port_costa.includes(postal_input) &&
      !location_input.includes("port costa") &&
      property_type.length != 0) ||
    (!code_redwood_city.includes(postal_input) &&
      !location_input.includes("redwood") &&
      property_type.length != 0) ||
    (!code_richmond.includes(postal_input) &&
      !location_input.includes("richmond") &&
      property_type.length != 0) ||
    (!code_rodeo.includes(postal_input) &&
      !location_input.includes("rodeo") &&
      property_type.length != 0) ||
    (!code_ross.includes(postal_input) &&
      !location_input.includes("ross") &&
      property_type.length != 0) ||
    (!code_san_anselmo.includes(postal_input) &&
      !location_input.includes("san anselmo") &&
      property_type.length != 0) ||
    (!code_san_bruno.includes(postal_input) &&
      !location_input.includes("san bruno") &&
      property_type.length != 0) ||
    (!code_san_carlos.includes(postal_input) &&
      !location_input.includes("san carlos") &&
      property_type.length != 0) ||
    (!code_san_francisco.includes(postal_input) &&
      !location_input.includes("san francisco") &&
      property_type.length != 0) ||
    (!code_san_jose.includes(postal_input) &&
      !location_input.includes("san jose") &&
      property_type.length != 0) ||
    (!code_san_leandro.includes(postal_input) &&
      !location_input.includes("san leandro") &&
      property_type.length != 0) ||
    (!code_lorenzo.includes(postal_input) &&
      !location_input.includes("lorenzo") &&
      property_type.length != 0) ||
    (!code_san_martin.includes(postal_input) &&
      !location_input.includes("san martin") &&
      property_type.length != 0) ||
    (!code_san_mateo.includes(postal_input) &&
      !location_input.includes("san mateo") &&
      property_type.length != 0) ||
    (!code_san_pablo.includes(postal_input) &&
      !location_input.includes("san pablo") &&
      property_type.length != 0) ||
    (!code_san_quentin.includes(postal_input) &&
      !location_input.includes("san quentin") &&
      property_type.length != 0) ||
    (!code_san_rafael.includes(postal_input) &&
      !location_input.includes("san rafael") &&
      property_type.length != 0) ||
    (!code_san_ramon.includes(postal_input) &&
      !location_input.includes("san ramon") &&
      property_type.length != 0) ||
    (!code_santa_clara.includes(postal_input) &&
      !location_input.includes("santa clara") &&
      property_type.length != 0) ||
    (!code_santa_cruz.includes(postal_input) &&
      !location_input.includes("santa cruz") &&
      property_type.length != 0) ||
    (!code_saratoga.includes(postal_input) &&
      !location_input.includes("saratoga") &&
      property_type.length != 0) ||
    (!code_sausalito.includes(postal_input) &&
      !location_input.includes("sausalito") &&
      property_type.length != 0) ||
    (!code_scotts_valley.includes(postal_input) &&
      !location_input.includes("scotts valley") &&
      property_type.length != 0) ||
    (!code_south_san_francisco.includes(postal_input) &&
      !location_input.includes("south san francisco") &&
      property_type.length != 0) ||
    (!code_stanford.includes(postal_input) &&
      !location_input.includes("stanford") &&
      property_type.length != 0) ||
    (!code_sunnyvale.includes(postal_input) &&
      !location_input.includes("sunnyvale") &&
      property_type.length != 0) ||
    (!code_sunol.includes(postal_input) &&
      !location_input.includes("sunol") &&
      property_type.length != 0) ||
    (!code_tracy.includes(postal_input) &&
      !location_input.includes("tracy") &&
      property_type.length != 0) ||
    (!code_union_city.includes(postal_input) &&
      !location_input.includes("union city") &&
      property_type.length != 0) ||
    (!code_vallejo.includes(postal_input) &&
      !location_input.includes("vallejo") &&
      property_type.length != 0) ||
    (!code_walnut_creek.includes(postal_input) &&
      !location_input.includes("walnut creek") &&
      property_type.length != 0) ||
    (!code_bonita.includes(postal_input) &&
      !location_input.includes("bonita") &&
      property_type.length != 0) ||
    (!code_bonsall.includes(postal_input) &&
      !location_input.includes("bonsall") &&
      property_type.length != 0) ||
    (!code_cardiff_by_the_sea.includes(postal_input) &&
      !location_input.includes("cardiff") &&
      property_type.length != 0) ||
    (!code_cardiff_by_the_sea.includes(postal_input) &&
      !location_input.includes("cardiff-by-the-sea") &&
      property_type.length != 0) ||
    (!code_carlsbad.includes(postal_input) &&
      !location_input.includes("carlsbad") &&
      property_type.length != 0) ||
    (!code_chula_vista.includes(postal_input) &&
      !location_input.includes("chula vista") &&
      property_type.length != 0) ||
    (!code_coronado.includes(postal_input) &&
      !location_input.includes("coronado") &&
      property_type.length != 0) ||
    (!code_del_mar.includes(postal_input) &&
      !location_input.includes("del mar") &&
      property_type.length != 0) ||
    (!code_el_cajon.includes(postal_input) &&
      !location_input.includes("el cajon") &&
      property_type.length != 0) ||
    (!code_encinitas.includes(postal_input) &&
      !location_input.includes("encinitas") &&
      property_type.length != 0) ||
    (!code_escondido.includes(postal_input) &&
      !location_input.includes("escondido") &&
      property_type.length != 0) ||
    (!code_fallbrook.includes(postal_input) &&
      !location_input.includes("fallbrook") &&
      property_type.length != 0) ||
    (!code_imperial_beach.includes(postal_input) &&
      !location_input.includes("imperial beach") &&
      property_type.length != 0) ||
    (!code_la_jolla.includes(postal_input) &&
      !location_input.includes("la jolla") &&
      property_type.length != 0) ||
    (!code_la_mesa.includes(postal_input) &&
      !location_input.includes("la mesa") &&
      property_type.length != 0) ||
    (!code_lemon_grove.includes(postal_input) &&
      !location_input.includes("lemon grove") &&
      property_type.length != 0) ||
    (!code_national_city.includes(postal_input) &&
      !location_input.includes("national") &&
      property_type.length != 0) ||
    (!code_oceanside.includes(postal_input) &&
      !location_input.includes("oceanside") &&
      property_type.length != 0) ||
    (!code_poway.includes(postal_input) &&
      !location_input.includes("poway") &&
      property_type.length != 0) ||
    (!code_rancho_santa_fe.includes(postal_input) &&
      !location_input.includes("rancho santa fe") &&
      property_type.length != 0) ||
    (!code_san_diego.includes(postal_input) &&
      !location_input.includes("san diego") &&
      property_type.length != 0) ||
    (!code_san_luis_rey.includes(postal_input) &&
      !location_input.includes("san luis rey") &&
      property_type.length != 0) ||
    (!code_san_marcos.includes(postal_input) &&
      !location_input.includes("san marcos") &&
      property_type.length != 0) ||
    (!code_san_ysidro.includes(postal_input) &&
      !location_input.includes("san ysidro") &&
      property_type.length != 0) ||
    (!code_santee.includes(postal_input) &&
      !location_input.includes("santee") &&
      property_type.length != 0) ||
    (!code_solana_beach.includes(postal_input) &&
      !location_input.includes("solana beach") &&
      property_type.length != 0) ||
    (!code_spring_valley.includes(postal_input) &&
      !location_input.includes("spring valley") &&
      property_type.length != 0) ||
    (!code_vista.includes(postal_input) &&
      !location_input.includes("vista") &&
      property_type.length != 0) ||
    (!code_aliso_viejo.includes(postal_input) &&
      !location_input.includes("aliso viejo") &&
      property_type.length != 0) ||
    (!code_bloomington.includes(postal_input) &&
      !location_input.includes("bloomington") &&
      property_type.length != 0) ||
    (!code_bryn_mawr.includes(postal_input) &&
      !location_input.includes("bryn mawr") &&
      property_type.length != 0) ||
    (!code_buena_park.includes(postal_input) &&
      !location_input.includes("buena park") &&
      property_type.length != 0) ||
    (!code_capistrano_beach.includes(postal_input) &&
      !location_input.includes("capistrano beach") &&
      property_type.length != 0) ||
    (!code_chino.includes(postal_input) &&
      !location_input.includes("chino") &&
      property_type.length != 0) ||
    (!code_claremont.includes(postal_input) &&
      !location_input.includes("claremont") &&
      property_type.length != 0) ||
    (!code_colton.includes(postal_input) &&
      !location_input.includes("colton") &&
      property_type.length != 0) ||
    (!code_corona.includes(postal_input) &&
      !location_input.includes("corona") &&
      property_type.length != 0) ||
    (!code_dana_point.includes(postal_input) &&
      !location_input.includes("dana point") &&
      property_type.length != 0) ||
    (!code_el_toro.includes(postal_input) &&
      !location_input.includes("el toro") &&
      property_type.length != 0) ||
    (!code_fontana.includes(postal_input) &&
      !location_input.includes("fontana") &&
      property_type.length != 0) ||
    (!code_grand_terrace.includes(postal_input) &&
      !location_input.includes("grand terrace") &&
      property_type.length != 0) ||
    (!code_guasti.includes(postal_input) &&
      !location_input.includes("guasti") &&
      property_type.length != 0) ||
    (!code_highland.includes(postal_input) &&
      !location_input.includes("highland") &&
      property_type.length != 0) ||
    (!code_irvine.includes(postal_input) &&
      !location_input.includes("irvine") &&
      property_type.length != 0) ||
    (!code_ladera_ranch.includes(postal_input) &&
      !location_input.includes("ladera ranch") &&
      property_type.length != 0) ||
    (!code_laguna_beach.includes(postal_input) &&
      !location_input.includes("laguna beach") &&
      property_type.length != 0) ||
    (!code_laguna_hills.includes(postal_input) &&
      !location_input.includes("laguna hills") &&
      property_type.length != 0) ||
    (!code_laguna_niguel.includes(postal_input) &&
      !location_input.includes("laguna niguel") &&
      property_type.length != 0) ||
    (!code_laguna_woods.includes(postal_input) &&
      !location_input.includes("laguna woods") &&
      property_type.length != 0) ||
    (!code_lake_forest.includes(postal_input) &&
      !location_input.includes("lake forest") &&
      property_type.length != 0) ||
    (!code_loma_linda.includes(postal_input) &&
      !location_input.includes("loma linda") &&
      property_type.length != 0) ||
    (!code_march_air_reserve_base.includes(postal_input) &&
      !location_input.includes("march air reserve") &&
      property_type.length != 0) ||
    (!code_mira_loma.includes(postal_input) &&
      !location_input.includes("mira loma") &&
      property_type.length != 0) ||
    (!code_mission_viejo.includes(postal_input) &&
      !location_input.includes("mission viejo") &&
      property_type.length != 0) ||
    (!code_montclair.includes(postal_input) &&
      !location_input.includes("montclair") &&
      property_type.length != 0) ||
    (!code_moreno_valley.includes(postal_input) &&
      !location_input.includes("moreno valley") &&
      property_type.length != 0) ||
    (!code_norco.includes(postal_input) &&
      !location_input.includes("norco") &&
      property_type.length != 0) ||
    (!code_ontario.includes(postal_input) &&
      !location_input.includes("ontario") &&
      property_type.length != 0) ||
    (!code_patton.includes(postal_input) &&
      !location_input.includes("patton") &&
      property_type.length != 0) ||
    (!code_perris.includes(postal_input) &&
      !location_input.includes("perris") &&
      property_type.length != 0) ||
    (!code_pomona.includes(postal_input) &&
      !location_input.includes("pomona") &&
      property_type.length != 0) ||
    (!code_ranco_cucamonga.includes(postal_input) &&
      !location_input.includes("rancho cucamonga") &&
      property_type.length != 0) ||
    (!code_rancho_santa_margarita.includes(postal_input) &&
      !location_input.includes("rancho santa margarita") &&
      property_type.length != 0) ||
    (!code_redlands.includes(postal_input) &&
      !location_input.includes("redlands") &&
      property_type.length != 0) ||
    (!code_rialto.includes(postal_input) &&
      !location_input.includes("rialto") &&
      property_type.length != 0) ||
    (!code_riverside.includes(postal_input) &&
      !location_input.includes("riverside") &&
      property_type.length != 0) ||
    (!code_san_bernardino.includes(postal_input) &&
      !location_input.includes("san bernardino") &&
      property_type.length != 0) ||
    (!code_san_clemente.includes(postal_input) &&
      !location_input.includes("san clemente") &&
      property_type.length != 0) ||
    (!code_san_dimas.includes(postal_input) &&
      !location_input.includes("san dimas") &&
      property_type.length != 0) ||
    (!code_san_juan_capistrano.includes(postal_input) &&
      !location_input.includes("san juan capistrano") &&
      property_type.length != 0) ||
    (!code_upland.includes(postal_input) &&
      !location_input.includes("upland") &&
      property_type.length != 0) ||
    (!code_arvada.includes(postal_input) &&
      !location_input.includes("arvada") &&
      property_type.length != 0) ||
    (!code_aurora.includes(postal_input) &&
      !location_input.includes("aurora") &&
      property_type.length != 0) ||
    (!code_boulder.includes(postal_input) &&
      !location_input.includes("boulder") &&
      property_type.length != 0) ||
    (!code_brighton.includes(postal_input) &&
      !location_input.includes("brighton") &&
      property_type.length != 0) ||
    (!code_broomfield.includes(postal_input) &&
      !location_input.includes("broomfield") &&
      property_type.length != 0) ||
    (!code_commerce_city.includes(postal_input) &&
      !location_input.includes("commerce city") &&
      property_type.length != 0) ||
    (!code_denver.includes(postal_input) &&
      !location_input.includes("denver") &&
      property_type.length != 0) ||
    (!code_dupont.includes(postal_input) &&
      !location_input.includes("dupont") &&
      property_type.length != 0) ||
    (!code_eastlake.includes(postal_input) &&
      !location_input.includes("eastlake") &&
      property_type.length != 0) ||
    (!code_englewood.includes(postal_input) &&
      !location_input.includes("englewood") &&
      property_type.length != 0) ||
    (!code_henderson.includes(postal_input) &&
      !location_input.includes("henderson") &&
      property_type.length != 0) ||
    (!code_littleton.includes(postal_input) &&
      !location_input.includes("littleton") &&
      property_type.length != 0) ||
    (!code_westminster.includes(postal_input) &&
      !location_input.includes("westminster") &&
      property_type.length != 0) ||
    (!code_blue_diamond.includes(postal_input) &&
      !location_input.includes("blue diamond") &&
      property_type.length != 0) ||
    (!code_boulder_city.includes(postal_input) &&
      !location_input.includes("boulder") &&
      property_type.length != 0) ||
    (!code_bunkerville.includes(postal_input) &&
      !location_input.includes("bunkerville") &&
      property_type.length != 0) ||
    (!code_cal_nev_ari.includes(postal_input) &&
      !location_input.includes("cal nev ari") &&
      property_type.length != 0) ||
    (!code_coyote_springs.includes(postal_input) &&
      !location_input.includes("coyote springs") &&
      property_type.length != 0) ||
    (!code_henderson.includes(postal_input) &&
      !location_input.includes("henderson") &&
      property_type.length != 0) ||
    (!code_indian_springs.includes(postal_input) &&
      !location_input.includes("indian springs") &&
      property_type.length != 0) ||
    (!code_jean.includes(postal_input) &&
      !location_input.includes("jean") &&
      property_type.length != 0) ||
    (!code_las_vegas.includes(postal_input) &&
      !location_input.includes("las vegas") &&
      property_type.length != 0) ||
    (!code_laughlin.includes(postal_input) &&
      !location_input.includes("laughlin") &&
      property_type.length != 0) ||
    (!code_logandale.includes(postal_input) &&
      !location_input.includes("logandale") &&
      property_type.length != 0) ||
    (!code_mesquite.includes(postal_input) &&
      !location_input.includes("mesquite") &&
      property_type.length != 0) ||
    (!code_moapa.includes(postal_input) &&
      !location_input.includes("moapa") &&
      property_type.length != 0) ||
    (!code_nellis_afb.includes(postal_input) &&
      !location_input.includes("nellis afb") &&
      property_type.length != 0) ||
    (!code_nellis_afb.includes(postal_input) &&
      !location_input.includes("nellis air force base") &&
      property_type.length != 0) ||
    (!code_north_las_vegas.includes(postal_input) &&
      !location_input.includes("north las vegas") &&
      property_type.length != 0) ||
    (!code_overton.includes(postal_input) &&
      !location_input.includes("overton") &&
      property_type.length != 0) ||
    (!code_searchlight.includes(postal_input) &&
      !location_input.includes("searchlight") &&
      property_type.length != 0) ||
    (!code_sloan.includes(postal_input) &&
      !location_input.includes("sloan") &&
      property_type.length != 0) ||
    (!code_the_lakes.includes(postal_input) &&
      !location_input.includes("the lakes") &&
      property_type.length != 0) ||
    (!code_accokeek.includes(postal_input) &&
      !location_input.includes("accokeek") &&
      property_type.length != 0) ||
    (!code_andrews_air_force_base.includes(postal_input) &&
      !location_input.includes("andrews air force base") &&
      property_type.length != 0) ||
    (!code_andrews_air_force_base.includes(postal_input) &&
      !location_input.includes("andrews afb") &&
      property_type.length != 0) ||
    (!code_annapolis.includes(postal_input) &&
      !location_input.includes("annapolis") &&
      property_type.length != 0) ||
    (!code_annapolis_junction.includes(postal_input) &&
      !location_input.includes("annapolis junction") &&
      property_type.length != 0) ||
    (!code_aquasco.includes(postal_input) &&
      !location_input.includes("aquasco") &&
      property_type.length != 0) ||
    (!code_arnold.includes(postal_input) &&
      !location_input.includes("arnold") &&
      property_type.length != 0) ||
    (!code_ashton.includes(postal_input) &&
      !location_input.includes("ashton") &&
      property_type.length != 0) ||
    (!code_baltimore.includes(postal_input) &&
      !location_input.includes("baltimore") &&
      property_type.length != 0) ||
    (!code_barnesville.includes(postal_input) &&
      !location_input.includes("barnesville") &&
      property_type.length != 0) ||
    (!code_beallsville.includes(postal_input) &&
      !location_input.includes("beallsville") &&
      property_type.length != 0) ||
    (!code_beltsville.includes(postal_input) &&
      !location_input.includes("beltsville") &&
      property_type.length != 0) ||
    (!code_bethesda.includes(postal_input) &&
      !location_input.includes("bethesda") &&
      property_type.length != 0) ||
    (!code_bladensburg.includes(postal_input) &&
      !location_input.includes("bladensburg") &&
      property_type.length != 0) ||
    (!code_bowie.includes(postal_input) &&
      !location_input.includes("bowie") &&
      property_type.length != 0) ||
    (!code_boyds.includes(postal_input) &&
      !location_input.includes("boyds") &&
      property_type.length != 0) ||
    (!code_brandywine.includes(postal_input) &&
      !location_input.includes("brandywine") &&
      property_type.length != 0) ||
    (!code_brentwood.includes(postal_input) &&
      !location_input.includes("brentwood") &&
      property_type.length != 0) ||
    (!code_brinklow.includes(postal_input) &&
      !location_input.includes("brinklow") &&
      property_type.length != 0) ||
    (!code_brookeville.includes(postal_input) &&
      !location_input.includes("brookeville") &&
      property_type.length != 0) ||
    (!code_burtonsville.includes(postal_input) &&
      !location_input.includes("burtonsville") &&
      property_type.length != 0) ||
    (!code_cabin_john.includes(postal_input) &&
      !location_input.includes("cabin john") &&
      property_type.length != 0) ||
    (!code_capitol_heights.includes(postal_input) &&
      !location_input.includes("capitol heights") &&
      property_type.length != 0) ||
    (!code_cheltenham.includes(postal_input) &&
      !location_input.includes("cheltenham") &&
      property_type.length != 0) ||
    (!code_chevy_chase.includes(postal_input) &&
      !location_input.includes("chevy chase") &&
      property_type.length != 0) ||
    (!code_churchton.includes(postal_input) &&
      !location_input.includes("churchton") &&
      property_type.length != 0) ||
    (!code_clarksburg.includes(postal_input) &&
      !location_input.includes("clarksburg") &&
      property_type.length != 0) ||
    (!code_clarksville.includes(postal_input) &&
      !location_input.includes("clarksville") &&
      property_type.length != 0) ||
    (!code_clinton.includes(postal_input) &&
      !location_input.includes("clinton") &&
      property_type.length != 0) ||
    (!code_college_park.includes(postal_input) &&
      !location_input.includes("college park") &&
      property_type.length != 0) ||
    (!code_columbia.includes(postal_input) &&
      !location_input.includes("columbia") &&
      property_type.length != 0) ||
    (!code_cooksville.includes(postal_input) &&
      !location_input.includes("cooksville") &&
      property_type.length != 0) ||
    (!code_crofton.includes(postal_input) &&
      !location_input.includes("crofton") &&
      property_type.length != 0) ||
    (!code_crownsville.includes(postal_input) &&
      !location_input.includes("crownsville") &&
      property_type.length != 0) ||
    (!code_curtis_bay.includes(postal_input) &&
      !location_input.includes("curtis bay") &&
      property_type.length != 0) ||
    (!code_damascus.includes(postal_input) &&
      !location_input.includes("damascus") &&
      property_type.length != 0) ||
    (!code_davidsonville.includes(postal_input) &&
      !location_input.includes("davidsonville") &&
      property_type.length != 0) ||
    (!code_dayton.includes(postal_input) &&
      !location_input.includes("dayton") &&
      property_type.length != 0) ||
    (!code_deale.includes(postal_input) &&
      !location_input.includes("deale") &&
      property_type.length != 0) ||
    (!code_derwood.includes(postal_input) &&
      !location_input.includes("derwood") &&
      property_type.length != 0) ||
    (!code_dickerson.includes(postal_input) &&
      !location_input.includes("dickerson") &&
      property_type.length != 0) ||
    (!code_district_heights.includes(postal_input) &&
      !location_input.includes("district heights") &&
      property_type.length != 0) ||
    (!code_edgewater.includes(postal_input) &&
      !location_input.includes("edgewater") &&
      property_type.length != 0) ||
    (!code_elkridge.includes(postal_input) &&
      !location_input.includes("elkridge") &&
      property_type.length != 0) ||
    (!code_ellicott_city.includes(postal_input) &&
      !location_input.includes("ellicott") &&
      property_type.length != 0) ||
    (!code_fort_george.includes(postal_input) &&
      !location_input.includes("fort george") &&
      property_type.length != 0) ||
    (!code_fort_washington.includes(postal_input) &&
      !location_input.includes("fort washington") &&
      property_type.length != 0) ||
    (!code_friendship.includes(postal_input) &&
      !location_input.includes("friendship") &&
      property_type.length != 0) ||
    (!code_fulton.includes(postal_input) &&
      !location_input.includes("fulton") &&
      property_type.length != 0) ||
    (!code_gaithersburg.includes(postal_input) &&
      !location_input.includes("gaithersburg") &&
      property_type.length != 0) ||
    (!code_galesville.includes(postal_input) &&
      !location_input.includes("galesville") &&
      property_type.length != 0) ||
    (!code_gambrills.includes(postal_input) &&
      !location_input.includes("gambrills") &&
      property_type.length != 0) ||
    (!code_garrett_park.includes(postal_input) &&
      !location_input.includes("garrett park") &&
      property_type.length != 0) ||
    (!code_germantown.includes(postal_input) &&
      !location_input.includes("germantown") &&
      property_type.length != 0) ||
    (!code_gibson_island.includes(postal_input) &&
      !location_input.includes("gibson island") &&
      property_type.length != 0) ||
    (!code_glen_burnie.includes(postal_input) &&
      !location_input.includes("glen burnie") &&
      property_type.length != 0) ||
    (!code_glen_echo.includes(postal_input) &&
      !location_input.includes("glen echo") &&
      property_type.length != 0) ||
    (!code_glenelg.includes(postal_input) &&
      !location_input.includes("glenelg") &&
      property_type.length != 0) ||
    (!code_glenn_dale.includes(postal_input) &&
      !location_input.includes("glenn dale") &&
      property_type.length != 0) ||
    (!code_glenwood.includes(postal_input) &&
      !location_input.includes("glenwood") &&
      property_type.length != 0) ||
    (!code_greenbelt.includes(postal_input) &&
      !location_input.includes("greenbelt") &&
      property_type.length != 0) ||
    (!code_hanover.includes(postal_input) &&
      !location_input.includes("hanover") &&
      property_type.length != 0) ||
    (!code_harmans.includes(postal_input) &&
      !location_input.includes("harmans") &&
      property_type.length != 0) ||
    (!code_harwood.includes(postal_input) &&
      !location_input.includes("harwood") &&
      property_type.length != 0) ||
    (!code_highland.includes(postal_input) &&
      !location_input.includes("highland") &&
      property_type.length != 0) ||
    (!code_hyattsville.includes(postal_input) &&
      !location_input.includes("hyattsville") &&
      property_type.length != 0) ||
    (!code_jessup.includes(postal_input) &&
      !location_input.includes("jessup") &&
      property_type.length != 0) ||
    (!code_kensington.includes(postal_input) &&
      !location_input.includes("kensington") &&
      property_type.length != 0) ||
    (!code_lanham.includes(postal_input) &&
      !location_input.includes("lanham") &&
      property_type.length != 0) ||
    (!code_laurel.includes(postal_input) &&
      !location_input.includes("laurel") &&
      property_type.length != 0) ||
    (!code_linthicum_heights.includes(postal_input) &&
      !location_input.includes("linthicum heights") &&
      property_type.length != 0) ||
    (!code_lisbon.includes(postal_input) &&
      !location_input.includes("lisbon") &&
      property_type.length != 0) ||
    (!code_mayo.includes(postal_input) &&
      !location_input.includes("mayo") &&
      property_type.length != 0) ||
    (!code_millersville.includes(postal_input) &&
      !location_input.includes("millersville") &&
      property_type.length != 0) ||
    (!code_montgomery_village.includes(postal_input) &&
      !location_input.includes("montgomery village") &&
      property_type.length != 0) ||
    (!code_mount_rainier.includes(postal_input) &&
      !location_input.includes("mount rainier") &&
      property_type.length != 0) ||
    (!code_odenton.includes(postal_input) &&
      !location_input.includes("odenton") &&
      property_type.length != 0) ||
    (!code_olney.includes(postal_input) &&
      !location_input.includes("olney") &&
      property_type.length != 0) ||
    (!code_oxon_hill.includes(postal_input) &&
      !location_input.includes("oxon hill") &&
      property_type.length != 0) ||
    (!code_poolesville.includes(postal_input) &&
      !location_input.includes("poolesville") &&
      property_type.length != 0) ||
    (!code_potomac.includes(postal_input) &&
      !location_input.includes("potomac") &&
      property_type.length != 0) ||
    (!code_riva.includes(postal_input) &&
      !location_input.includes("riva") &&
      property_type.length != 0) ||
    (!code_riverdale.includes(postal_input) &&
      !location_input.includes("riverdale") &&
      property_type.length != 0) ||
    (!code_rockville.includes(postal_input) &&
      !location_input.includes("rockville") &&
      property_type.length != 0) ||
    (!code_sandy_spring.includes(postal_input) &&
      !location_input.includes("sandy spring") &&
      property_type.length != 0) ||
    (!code_savage.includes(postal_input) &&
      !location_input.includes("savage") &&
      property_type.length != 0) ||
    (!code_severn.includes(postal_input) &&
      !location_input.includes("severn") &&
      property_type.length != 0) ||
    (!code_severna_park.includes(postal_input) &&
      !location_input.includes("severna park") &&
      property_type.length != 0) ||
    (!code_shady_side.includes(postal_input) &&
      !location_input.includes("shady side") &&
      property_type.length != 0) ||
    (!code_silver_spring.includes(postal_input) &&
      !location_input.includes("silver spring") &&
      property_type.length != 0) ||
    (!code_simpsonville.includes(postal_input) &&
      !location_input.includes("simpsonville") &&
      property_type.length != 0) ||
    (!code_spencerville.includes(postal_input) &&
      !location_input.includes("spencerville") &&
      property_type.length != 0) ||
    (!code_suitland.includes(postal_input) &&
      !location_input.includes("suitland") &&
      property_type.length != 0) ||
    (!code_takoma_park.includes(postal_input) &&
      !location_input.includes("takoma park") &&
      property_type.length != 0) ||
    (!code_temple_hills.includes(postal_input) &&
      !location_input.includes("temple hills") &&
      property_type.length != 0) ||
    (!code_tracys_landing.includes(postal_input) &&
      !location_input.includes("tracys landing") &&
      property_type.length != 0) ||
    (!code_upper_marlboro.includes(postal_input) &&
      !location_input.includes("upper marlboro") &&
      property_type.length != 0) ||
    (!code_washington_grove.includes(postal_input) &&
      !location_input.includes("washington grove") &&
      property_type.length != 0) ||
    (!code_west_friendship.includes(postal_input) &&
      !location_input.includes("west friendship") &&
      property_type.length != 0) ||
    (!code_west_river.includes(postal_input) &&
      !location_input.includes("west river") &&
      property_type.length != 0) ||
    (!code_woodbine.includes(postal_input) &&
      !location_input.includes("woodbine") &&
      property_type.length != 0) ||
    (!code_woodstock.includes(postal_input) &&
      !location_input.includes("woodstock") &&
      property_type.length != 0) ||
    // RAVE
    (!code_austin.includes(postal_input) &&
      !location_input.includes("austin") &&
      property_type.length != 0) ||
    (!code_bastrop.includes(postal_input) &&
      !location_input.includes("bastrop") &&
      property_type.length != 0) ||
    (!code_buda.includes(postal_input) &&
      !location_input.includes("buda") &&
      property_type.length != 0) ||
    (!code_cedar_creek.includes(postal_input) &&
      !location_input.includes("cedar creek") &&
      property_type.length != 0) ||
    (!code_cedar_park.includes(postal_input) &&
      !location_input.includes("cedar park") &&
      property_type.length != 0) ||
    (!code_corpus_christi.includes(postal_input) &&
      !location_input.includes("corpus christi") &&
      property_type.length != 0) ||
    (!code_coupland.includes(postal_input) &&
      !location_input.includes("coupland") &&
      property_type.length != 0) ||
    (!code_del_valle.includes(postal_input) &&
      !location_input.includes("del valle") &&
      property_type.length != 0) ||
    (!code_dripping_srpings.includes(postal_input) &&
      !location_input.includes("dripping springs") &&
      property_type.length != 0) ||
    (!code_elgin.includes(postal_input) &&
      !location_input.includes("elgin") &&
      property_type.length != 0) ||
    (!code_florence.includes(postal_input) &&
      !location_input.includes("florence") &&
      property_type.length != 0) ||
    (!code_georgetown.includes(postal_input) &&
      !location_input.includes("georgetown") &&
      property_type.length != 0) ||
    (!code_harker_heights.includes(postal_input) &&
      !location_input.includes("harker heights") &&
      property_type.length != 0) ||
    (!code_hutto.includes(postal_input) &&
      !location_input.includes("hutto") &&
      property_type.length != 0) ||
    (!code_jarrell.includes(postal_input) &&
      !location_input.includes("jarrell") &&
      property_type.length != 0) ||
    (!code_killeen.includes(postal_input) &&
      !location_input.includes("killeen") &&
      property_type.length != 0) ||
    (!code_kyle.includes(postal_input) &&
      !location_input.includes("kyle") &&
      property_type.length != 0) ||
    (!code_leander.includes(postal_input) &&
      !location_input.includes("leander") &&
      property_type.length != 0) ||
    (!code_liberty_hill.includes(postal_input) &&
      !location_input.includes("liberty hill") &&
      property_type.length != 0) ||
    (!code_manchaca.includes(postal_input) &&
      !location_input.includes("manchaca") &&
      property_type.length != 0) ||
    (!code_manor.includes(postal_input) &&
      !location_input.includes("manor") &&
      property_type.length != 0) ||
    (!code_pflugerville.includes(postal_input) &&
      !location_input.includes("pflugerville") &&
      property_type.length != 0) ||
    (!code_roundrock.includes(postal_input) &&
      !location_input.includes("round rock") &&
      property_type.length != 0) ||
    (!code_salado.includes(postal_input) &&
      !location_input.includes("salado") &&
      property_type.length != 0) ||
    (!code_taylor.includes(postal_input) &&
      !location_input.includes("taylor") &&
      property_type.length != 0) ||
    (!code_temple.includes(postal_input) &&
      !location_input.includes("temple") &&
      property_type.length != 0) ||
    // COMPLETE
    (!code_alief.includes(postal_input) &&
      !location_input.includes("alief") &&
      property_type.length != 0) ||
    (!code_alvin.includes(postal_input) &&
      !location_input.includes("alvin") &&
      property_type.length != 0) ||
    (!code_angleton.includes(postal_input) &&
      !location_input.includes("angleton") &&
      property_type.length != 0) ||
    (!code_bacliff.includes(postal_input) &&
      !location_input.includes("bacliff") &&
      property_type.length != 0) ||
    (!code_barker.includes(postal_input) &&
      !location_input.includes("barker") &&
      property_type.length != 0) ||
    (!code_baytown.includes(postal_input) &&
      !location_input.includes("baytown") &&
      property_type.length != 0) ||
    (!code_bellaire.includes(postal_input) &&
      !location_input.includes("bellaire") &&
      property_type.length != 0) ||
    (!code_channelview.includes(postal_input) &&
      !location_input.includes("channelview") &&
      property_type.length != 0) ||
    (!code_conroe.includes(postal_input) &&
      !location_input.includes("conroe") &&
      property_type.length != 0) ||
    (!code_crosby.includes(postal_input) &&
      !location_input.includes("crosby") &&
      property_type.length != 0) ||
    (!code_cypress.includes(postal_input) &&
      !location_input.includes("cypress") &&
      property_type.length != 0) ||
    (!code_deer_park.includes(postal_input) &&
      !location_input.includes("deer park") &&
      property_type.length != 0) ||
    (!code_dickinson.includes(postal_input) &&
      !location_input.includes("dickinson") &&
      property_type.length != 0) ||
    (!code_freeport.includes(postal_input) &&
      !location_input.includes("freeport") &&
      property_type.length != 0) ||
    (!code_fresno.includes(postal_input) &&
      !location_input.includes("fresno") &&
      property_type.length != 0) ||
    (!code_friendswood.includes(postal_input) &&
      !location_input.includes("friendswood") &&
      property_type.length != 0) ||
    (!code_gelena_park.includes(postal_input) &&
      !location_input.includes("gelena park") &&
      property_type.length != 0) ||
    (!code_hempstead.includes(postal_input) &&
      !location_input.includes("hempstead") &&
      property_type.length != 0) ||
    (!code_highlands.includes(postal_input) &&
      !location_input.includes("highlands") &&
      property_type.length != 0) ||
    (!code_hitchcock.includes(postal_input) &&
      !location_input.includes("hitchcock") &&
      property_type.length != 0) ||
    (!code_houston.includes(postal_input) &&
      !location_input.includes("houston") &&
      property_type.length != 0) ||
    (!code_huffman.includes(postal_input) &&
      !location_input.includes("huffman") &&
      property_type.length != 0) ||
    (!code_humble.includes(postal_input) &&
      !location_input.includes("humble") &&
      property_type.length != 0) ||
    (!code_katy.includes(postal_input) &&
      !location_input.includes("katy") &&
      property_type.length != 0) ||
    (!code_kemah.includes(postal_input) &&
      !location_input.includes("kemah") &&
      property_type.length != 0) ||
    (!code_kingwood.includes(postal_input) &&
      !location_input.includes("kingwood") &&
      property_type.length != 0) ||
    (!code_la_marque.includes(postal_input) &&
      !location_input.includes("la marque") &&
      property_type.length != 0) ||
    (!code_la_porte.includes(postal_input) &&
      !location_input.includes("la porte") &&
      property_type.length != 0) ||
    (!code_league_city.includes(postal_input) &&
      !location_input.includes("league city") &&
      property_type.length != 0) ||
    (!code_liverpool.includes(postal_input) &&
      !location_input.includes("liverpool") &&
      property_type.length != 0) ||
    (!code_manvel.includes(postal_input) &&
      !location_input.includes("manvel") &&
      property_type.length != 0) ||
    (!code_missouri_city.includes(postal_input) &&
      !location_input.includes("missouri") &&
      property_type.length != 0) ||
    (!code_north_houston.includes(postal_input) &&
      !location_input.includes("north houston") &&
      property_type.length != 0) ||
    (!code_pearland.includes(postal_input) &&
      !location_input.includes("pearland") &&
      property_type.length != 0) ||
    (!code_porter.includes(postal_input) &&
      !location_input.includes("porter") &&
      property_type.length != 0) ||
    (!code_rosenberg.includes(postal_input) &&
      !location_input.includes("rosenberg") &&
      property_type.length != 0) ||
    (!code_rosharon.includes(postal_input) &&
      !location_input.includes("rosharon") &&
      property_type.length != 0) ||
    (!code_santa_fe.includes(postal_input) &&
      !location_input.includes("santa fe") &&
      property_type.length != 0) ||
    (!code_seabrook.includes(postal_input) &&
      !location_input.includes("seabrook") &&
      property_type.length != 0) ||
    (!code_south_houston.includes(postal_input) &&
      !location_input.includes("south houston") &&
      property_type.length != 0) ||
    (!code_spring.includes(postal_input) &&
      !location_input.includes("spring") &&
      property_type.length != 0) ||
    (!code_stafford.includes(postal_input) &&
      !location_input.includes("stafford") &&
      property_type.length != 0) ||
    (!code_sugar_land.includes(postal_input) &&
      !location_input.includes("sugar land") &&
      property_type.length != 0) ||
    (!code_texas_city.includes(postal_input) &&
      !location_input.includes("texas") &&
      property_type.length != 0) ||
    (!code_thompsons.includes(postal_input) &&
      !location_input.includes("thompsons") &&
      property_type.length != 0) ||
    (!code_tomball.includes(postal_input) &&
      !location_input.includes("tomball") &&
      property_type.length != 0) ||
    (!code_waller.includes(postal_input) &&
      !location_input.includes("waller") &&
      property_type.length != 0) ||
    (!code_webster.includes(postal_input) &&
      !location_input.includes("webster") &&
      property_type.length != 0) ||
    (!code_west_columbia.includes(postal_input) &&
      !location_input.includes("west columbia") &&
      property_type.length != 0) ||
    // CREEKBEND
    (!code_charleston.includes(postal_input) &&
      !location_input.includes("charleston") &&
      property_type.length != 0) ||
    (!code_folly_beach.includes(postal_input) &&
      !location_input.includes("folly beach") &&
      property_type.length != 0) ||
    (!code_goose_creek.includes(postal_input) &&
      !location_input.includes("goose creek") &&
      property_type.length != 0) ||
    (!code_hanahan.includes(postal_input) &&
      !location_input.includes("hanahan") &&
      property_type.length != 0) ||
    (!code_isle_of_palms.includes(postal_input) &&
      !location_input.includes("isle of palms") &&
      property_type.length != 0) ||
    (!code_isle_of_palms.includes(postal_input) &&
      !location_input.includes("palms isle") &&
      property_type.length != 0) ||
    (!code_johns_island.includes(postal_input) &&
      !location_input.includes("johns island") &&
      property_type.length != 0) ||
    (!code_ladson.includes(postal_input) &&
      !location_input.includes("ladson") &&
      property_type.length != 0) ||
    (!code_moncks_corner.includes(postal_input) &&
      !location_input.includes("moncks corner") &&
      property_type.length != 0) ||
    (!code_mount_pleasant.includes(postal_input) &&
      !location_input.includes("mount pleasant") &&
      property_type.length != 0) ||
    (!code_mount_pleasant.includes(postal_input) &&
      !location_input.includes("mt. pleasant") &&
      property_type.length != 0) ||
    (!code_north_charleston.includes(postal_input) &&
      !location_input.includes("north charleston") &&
      property_type.length != 0) ||
    (!code_sullivan_island.includes(postal_input) &&
      !location_input.includes("sullivans island") &&
      property_type.length != 0) ||
    (!code_summerville.includes(postal_input) &&
      !location_input.includes("summerville") &&
      property_type.length != 0) ||
    // RADIUS
    (!code_annada.includes(postal_input) &&
      !location_input.includes("annada") &&
      property_type.length != 0) ||
    (!code_augusta.includes(postal_input) &&
      !location_input.includes("augusta") &&
      property_type.length != 0) ||
    (!code_ballwin.includes(postal_input) &&
      !location_input.includes("ballwin") &&
      property_type.length != 0) ||
    (!code_barnhart.includes(postal_input) &&
      !location_input.includes("barnhart") &&
      property_type.length != 0) ||
    (!code_beaufort.includes(postal_input) &&
      !location_input.includes("beaufort") &&
      property_type.length != 0) ||
    (!code_bridgeton.includes(postal_input) &&
      !location_input.includes("bridgeton") &&
      property_type.length != 0) ||
    (!code_catawissa.includes(postal_input) &&
      !location_input.includes("catawissa") &&
      property_type.length != 0) ||
    (!code_cedar_hill.includes(postal_input) &&
      !location_input.includes("cedar hill") &&
      property_type.length != 0) ||
    (!code_chesterfield.includes(postal_input) &&
      !location_input.includes("chesterfield") &&
      property_type.length != 0) ||
    (!code_crystal_city.includes(postal_input) &&
      !location_input.includes("crystal") &&
      property_type.length != 0) ||
    (!code_de_soto.includes(postal_input) &&
      !location_input.includes("de soto") &&
      property_type.length != 0) ||
    (!code_defiance.includes(postal_input) &&
      !location_input.includes("defiance") &&
      property_type.length != 0) ||
    (!code_dittmer.includes(postal_input) &&
      !location_input.includes("dittmer") &&
      property_type.length != 0) ||
    (!code_dutzow.includes(postal_input) &&
      !location_input.includes("dutzow") &&
      property_type.length != 0) ||
    (!code_earth_city.includes(postal_input) &&
      !location_input.includes("earth city") &&
      property_type.length != 0) ||
    (!code_elsberry.includes(postal_input) &&
      !location_input.includes("elsberry") &&
      property_type.length != 0) ||
    (!code_eolia.includes(postal_input) &&
      !location_input.includes("eolia") &&
      property_type.length != 0) ||
    (!code_eureka.includes(postal_input) &&
      !location_input.includes("eureka") &&
      property_type.length != 0) ||
    (!code_fenton.includes(postal_input) &&
      !location_input.includes("fenton") &&
      property_type.length != 0) ||
    (!code_festus.includes(postal_input) &&
      !location_input.includes("festus") &&
      property_type.length != 0) ||
    (!code_fletcher.includes(postal_input) &&
      !location_input.includes("fletcher") &&
      property_type.length != 0) ||
    (!code_flinthill.includes(postal_input) &&
      !location_input.includes("flinthill") &&
      property_type.length != 0) ||
    (!code_florissant.includes(postal_input) &&
      !location_input.includes("florissant") &&
      property_type.length != 0) ||
    (!code_foley.includes(postal_input) &&
      !location_input.includes("foley") &&
      property_type.length != 0) ||
    (!code_foristell.includes(postal_input) &&
      !location_input.includes("foristell") &&
      property_type.length != 0) ||
    (!code_french_village.includes(postal_input) &&
      !location_input.includes("french village") &&
      property_type.length != 0) ||
    (!code_gerald.includes(postal_input) &&
      !location_input.includes("gerald") &&
      property_type.length != 0) ||
    (!code_glencoe.includes(postal_input) &&
      !location_input.includes("glencoe") &&
      property_type.length != 0) ||
    (!code_gray_summit.includes(postal_input) &&
      !location_input.includes("gray summit") &&
      property_type.length != 0) ||
    (!code_grover.includes(postal_input) &&
      !location_input.includes("grover") &&
      property_type.length != 0) ||
    (!code_grubville.includes(postal_input) &&
      !location_input.includes("grubville") &&
      property_type.length != 0) ||
    (!code_hawk_point.includes(postal_input) &&
      !location_input.includes("hawk point") &&
      property_type.length != 0) ||
    (!code_hazelwood.includes(postal_input) &&
      !location_input.includes("hazelwood") &&
      property_type.length != 0) ||
    (!code_herculaneum.includes(postal_input) &&
      !location_input.includes("herculaneum") &&
      property_type.length != 0) ||
    (!code_high_hill.includes(postal_input) &&
      !location_input.includes("high hill") &&
      property_type.length != 0) ||
    (!code_high_ridge.includes(postal_input) &&
      !location_input.includes("high ridge") &&
      property_type.length != 0) ||
    (!code_hillsboro.includes(postal_input) &&
      !location_input.includes("hillsboro") &&
      property_type.length != 0) ||
    (!code_house_springs.includes(postal_input) &&
      !location_input.includes("house springs") &&
      property_type.length != 0) ||
    (!code_imperial.includes(postal_input) &&
      !location_input.includes("imperial") &&
      property_type.length != 0) ||
    (!code_jonesburg.includes(postal_input) &&
      !location_input.includes("jonesburg") &&
      property_type.length != 0) ||
    (!code_kimmswick.includes(postal_input) &&
      !location_input.includes("kimmswick") &&
      property_type.length != 0) ||
    (!code_labadie.includes(postal_input) &&
      !location_input.includes("labadie") &&
      property_type.length != 0) ||
    (!code_lake_saint_louis.includes(postal_input) &&
      !location_input.includes("lake saint louis") &&
      property_type.length != 0) ||
    (!code_leslie.includes(postal_input) &&
      !location_input.includes("leslie") &&
      property_type.length != 0) ||
    (!code_liguori.includes(postal_input) &&
      !location_input.includes("liguori") &&
      property_type.length != 0) ||
    (!code_lonedell.includes(postal_input) &&
      !location_input.includes("lonedell") &&
      property_type.length != 0) ||
    (!code_luebbering.includes(postal_input) &&
      !location_input.includes("luebbering") &&
      property_type.length != 0) ||
    (!code_mapaville.includes(postal_input) &&
      !location_input.includes("mapaville") &&
      property_type.length != 0) ||
    (!code_marthasville.includes(postal_input) &&
      !location_input.includes("marthasville") &&
      property_type.length != 0) ||
    (!code_maryland_heights.includes(postal_input) &&
      !location_input.includes("maryland heights") &&
      property_type.length != 0) ||
    (!code_montgomery_city.includes(postal_input) &&
      !location_input.includes("montgomery") &&
      property_type.length != 0) ||
    (!code_moscow_mills.includes(postal_input) &&
      !location_input.includes("moscow mills") &&
      property_type.length != 0) ||
    (!code_new_florence.includes(postal_input) &&
      !location_input.includes("new florence") &&
      property_type.length != 0) ||
    (!code_new_haven.includes(postal_input) &&
      !location_input.includes("new haven") &&
      property_type.length != 0) ||
    (!code_new_melle.includes(postal_input) &&
      !location_input.includes("new melle") &&
      property_type.length != 0) ||
    (!code_o_fallon.includes(postal_input) &&
      !location_input.includes("o'fallon") &&
      property_type.length != 0) ||
    (!code_old_monroe.includes(postal_input) &&
      !location_input.includes("old monroe") &&
      property_type.length != 0) ||
    (!code_pacific.includes(postal_input) &&
      !location_input.includes("pacific") &&
      property_type.length != 0) ||
    (!code_pevely.includes(postal_input) &&
      !location_input.includes("pevely") &&
      property_type.length != 0) ||
    (!code_portage_des_sioux.includes(postal_input) &&
      !location_input.includes("portage des sioux") &&
      property_type.length != 0) ||
    (!code_richwoods.includes(postal_input) &&
      !location_input.includes("richwoods") &&
      property_type.length != 0) ||
    (!code_robertsville.includes(postal_input) &&
      !location_input.includes("robertsville") &&
      property_type.length != 0) ||
    (!code_saint_albans.includes(postal_input) &&
      !location_input.includes("saint albans") &&
      property_type.length != 0) ||
    (!code_saint_albans.includes(postal_input) &&
      !location_input.includes("st. albans") &&
      property_type.length != 0) ||
    (!code_saint_ann.includes(postal_input) &&
      !location_input.includes("saint ann") &&
      property_type.length != 0) ||
    (!code_saint_ann.includes(postal_input) &&
      !location_input.includes("st. ann") &&
      property_type.length != 0) ||
    (!code_saint_charles.includes(postal_input) &&
      !location_input.includes("saint charles") &&
      property_type.length != 0) ||
    (!code_saint_charles.includes(postal_input) &&
      !location_input.includes("st. charles") &&
      property_type.length != 0) ||
    (!code_saint_clair.includes(postal_input) &&
      !location_input.includes("saint clair") &&
      property_type.length != 0) ||
    (!code_saint_clair.includes(postal_input) &&
      !location_input.includes("st. claire") &&
      property_type.length != 0) ||
    (!code_saint_louis.includes(postal_input) &&
      !location_input.includes("saint louis") &&
      property_type.length != 0) ||
    (!code_saint_louis.includes(postal_input) &&
      !location_input.includes("st. louis") &&
      property_type.length != 0) ||
    (!code_saint_peters.includes(postal_input) &&
      !location_input.includes("saint peters") &&
      property_type.length != 0) ||
    (!code_saint_peters.includes(postal_input) &&
      !location_input.includes("st. peters") &&
      property_type.length != 0) ||
    (!code_silex.includes(postal_input) &&
      !location_input.includes("silex") &&
      property_type.length != 0) ||
    (!code_stanton.includes(postal_input) &&
      !location_input.includes("stanton") &&
      property_type.length != 0) ||
    (!code_sullivan.includes(postal_input) &&
      !location_input.includes("sullivan") &&
      property_type.length != 0) ||
    (!code_troy.includes(postal_input) &&
      !location_input.includes("troy") &&
      property_type.length != 0) ||
    (!code_truxton.includes(postal_input) &&
      !location_input.includes("truxton") &&
      property_type.length != 0) ||
    (!code_union.includes(postal_input) &&
      !location_input.includes("union") &&
      property_type.length != 0) ||
    (!code_valles_mines.includes(postal_input) &&
      !location_input.includes("valles mines") &&
      property_type.length != 0) ||
    (!code_valley_park.includes(postal_input) &&
      !location_input.includes("valley park") &&
      property_type.length != 0) ||
    (!code_villa_ridge.includes(postal_input) &&
      !location_input.includes("villa ridge") &&
      property_type.length != 0) ||
    (!code_warrenton.includes(postal_input) &&
      !location_input.includes("warrenton") &&
      property_type.length != 0) ||
    (!code_washington.includes(postal_input) &&
      !location_input.includes("washington") &&
      property_type.length != 0) ||
    (!code_wentzville.includes(postal_input) &&
      !location_input.includes("wentzville") &&
      property_type.length != 0) ||
    (!code_west_alton.includes(postal_input) &&
      !location_input.includes("west alton") &&
      property_type.length != 0) ||
    (!code_whiteside.includes(postal_input) &&
      !location_input.includes("whiteside") &&
      property_type.length != 0) ||
    (!code_winfield.includes(postal_input) &&
      !location_input.includes("winfield") &&
      property_type.length != 0) ||
    (!code_wright_city.includes(postal_input) &&
      !location_input.includes("wright city") &&
      property_type.length != 0) ||
    //rentsafe
    (!code_apex.includes(postal_input) &&
      !location_input.includes("apex") &&
      property_type.length != 0) ||
    (!code_cary.includes(postal_input) &&
      !location_input.includes("cary") &&
      property_type.length != 0) ||
    (!code_chapel_hill.includes(postal_input) &&
      !location_input.includes("chapel hill") &&
      property_type.length != 0) ||
    (!code_clayton.includes(postal_input) &&
      !location_input.includes("clayton") &&
      property_type.length != 0) ||
    (!code_durham.includes(postal_input) &&
      !location_input.includes("durham") &&
      property_type.length != 0) ||
    (!code_fuquay_varina.includes(postal_input) &&
      !location_input.includes("fuquay varina") &&
      property_type.length != 0) ||
    (!code_fuquay_varina.includes(postal_input) &&
      !location_input.includes("fuquay-varina") &&
      property_type.length != 0) ||
    (!code_garner.includes(postal_input) &&
      !location_input.includes("garner") &&
      property_type.length != 0) ||
    (!code_holly_springs.includes(postal_input) &&
      !location_input.includes("holly springs") &&
      property_type.length != 0) ||
    (!code_knightdale.includes(postal_input) &&
      !location_input.includes("knightdale") &&
      property_type.length != 0) ||
    (!code_moncure.includes(postal_input) &&
      !location_input.includes("moncure") &&
      property_type.length != 0) ||
    (!code_morrisville.includes(postal_input) &&
      !location_input.includes("morrisville") &&
      property_type.length != 0) ||
    (!code_new_hill.includes(postal_input) &&
      !location_input.includes("new hill") &&
      property_type.length != 0) ||
    (!code_raleigh.includes(postal_input) &&
      !location_input.includes("raleigh") &&
      property_type.length != 0) ||
    (!code_rolesville.includes(postal_input) &&
      !location_input.includes("rolesville") &&
      property_type.length != 0) ||
    (!code_wake_forest.includes(postal_input) &&
      !location_input.includes("wake forest") &&
      property_type.length != 0) ||
    (!code_wendell.includes(postal_input) &&
      !location_input.includes("wendell") &&
      property_type.length != 0) ||
    (!code_willow_spring.includes(postal_input) &&
      !location_input.includes("willow spring") &&
      property_type.length != 0) ||
    (!code_zebulon.includes(postal_input) &&
      !location_input.includes("zebulon") &&
      property_type.length != 0)
  ) {
    // if user_input has subsidiary zipcodes but locations mismatch
    modal_unserviced.style.display = "block";
  } else {
    modal_empty.style.display = "block";
  }
}

google.maps.event.addDomListener(window, 'load', initMap);
console.log("Ready!")