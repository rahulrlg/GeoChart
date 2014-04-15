var privateVariables={
    map:'',
    table:'',
    data:'',
    arrContinents:[
          ['Continents', 'Popularity'],
          ['Africa',1],
          ['Europe', 5],
          ['Asia', 2],
          ['Americas', 1]
    ],
    arrUSStateData:[
        ['California',3],
        ['Oregon',1],
        ['New York',5]
    ],
    arrAllData:'',
    arrInput:[
          ['Country', 'Popularity'],
          ['Germany',1],
          ['United States', 5],
          ['Brazil', 2],
          ['Canada', 1],
          ['France', 3],
          ['India', 5],
          ['Spain', 1],
          ['Pakistan', 1],
          ['California',3],
          ['Oregon',1],
          ['New York',5]
      ],
    options:{
            region:'world',
            legend:'none',
            resolution:'countries',
            colorAxis: {
                minValue: 1,
                maxValue: 4,
                colors:['green','#222888','#004444']
            }
    
            }
};

google.load('visualization', '1', { packages: ['Geochart', 'table'] });
google.setOnLoadCallback(drawGeoChartAndTable);

    
   function drawGeoChartAndTable(){
   
    privateVariables.data = google.visualization.arrayToDataTable(privateVariables.arrInput);
    var Geochart = new google.visualization.GeoChart(document.getElementById('Geochart'));
    Geochart.draw(privateVariables.data, privateVariables.options);

    var table = new google.visualization.Table(document.getElementById('table'));
    table.draw(privateVariables.data, null);
    google.visualization.events.addListener(table, 'select', function () {
        Geochart.setSelection(table.getSelection());
               
        //var selection = table.getSelection();
        //alert(selection[0].row);
         //alert(eval('('+selection+')'));
        
    });
    
    Geochart.draw(privateVariables.data, privateVariables.options);

    google.visualization.events.addListener(Geochart,'regionClick',function(eventOption)
    {
        //alert(options.resolution);
        if(privateVariables.options.resolution==='countries' && eventOption.region==='US')
        {
            //options={region:eventOption.region,resolution:'provinces'};
            privateVariables.options.region=eventOption.region;
            privateVariables.options.resolution='provinces';
            Geochart.draw(privateVariables.data, privateVariables.options);
            $("#spnCountries").attr('resolution','provinces').html(">"+eventOption.region).addClass('ui-priority-primary');
            $("#spnCountries").prevAll().removeClass('ui-priority-primary');
        }
        else if(privateVariables.options.resolution==='provinces')
        {
           // options={region:eventOption.region,resolution:'metros'};
             privateVariables.options.region=eventOption.region;
            privateVariables.options.resolution='metros';
            Geochart.draw(privateVariables.data, privateVariables.options);
            $("#spnState").attr('resolution','metros').html(">"+eventOption.region).addClass('ui-priority-primary');
            $("#spnState").prevAll().removeClass('ui-priority-primary');
        }
    });

    Geochart.draw(privateVariables.data, privateVariables.options);
}

var privateMethods={
    init:function()
    {
        $("#spnHome").attr('resolution','countries');
        privateMethods.bindData();
        privateMethods.bindEvents();
    },
    bindData:function()
    {
        //alert(1);
        var jqhr=$.getJSON("data.json",function(d){
                    alert(3);
                    });
    },
    bindEvents:function()
    {
        $("body").bind('click',eventListeners.onNavigationClick);
    }
};

var eventListeners={
    onNavigationClick:function(e)
    {
         
        if($(e.target).is('span'))
         {
           if($(e.target).html()==='Home')
            {
               //alert($(e.target).attr('resolution'));
              // options={region:'world',resolution:$(e.target).attr('resolution')};
               privateVariables.options.region='world';
               privateVariables.options.resolution=$(e.target).attr('resolution');
                drawGeoChartAndTable();
               $(e.target).nextAll().empty();
               $(e.target).addClass('ui-priority-primary');
               $(e.target).nextAll().removeClass('ui-priority-primary').addClass('ui-priority-secondary');
               $(e.target).prevAll().removeClass('ui-priority-primary').addClass('ui-priority-secondary');
            }
            else
            {

              // options={region:$(e.target).html().substring(4),resolution:$(e.target).attr('resolution')};
               privateVariables.options.region=$(e.target).html().substring(4);
               privateVariables.options.resolution=$(e.target).attr('resolution');
               drawGeoChartAndTable();
               $(e.target).nextAll().empty();
               $(e.target).addClass('ui-priority-primary');
               $(e.target).nextAll().removeClass('ui-priority-primary').addClass('ui-priority-secondary');
               $(e.target).prevAll().removeClass('ui-priority-primary').addClass('ui-priority-secondary');
            }
         }
        else
        {
            return false;
        }
    }
};
$(document).ready(function(){
     privateMethods.init();
});
   





