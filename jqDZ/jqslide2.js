
$(document).ready(function(){
    let images = ['dubai','koshka','maldivi','ozero','tayga','vecher','voda','zakat'];
    let path = 'img/';
    let count = 0;
    let time = 6600;
    let timer = setTimeout(changer, time, 1);
    $('#slide')
        .css({
            position:'relative',
            display:'flex',
            width: '90%',
            height: '70vh',
            
            margin: 'auto',
           
            overflow: 'hidden'
        }).html('<div id="container"></div>')
        .click(function(e){
            e.clientX < this.offsetWidth / 2 ? changer(-1):changer(1) 
           
        }).append('<div id="miniImg"></div>')
    document.head.innerHTML += '<style>.img{position:absolute; height:100%;width:100%; object-fit:cover; transform: rotateY(0deg); transition: transform 1s linear;} .active{transform: scale(1.2) translateY(-5px);} </style>'
    $('#container').css({
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        left: 0,
        perspective:' 800px'
    }).html('<img  class="img" src="'+path + images[count]+ '.jpg"/> ')
    
    
    
    
    $('#miniImg').css({
        position: 'absolute',
        width: '100%',
        height: '50px',
        textAlign: 'center',
        bottom: '7px'
    }).html(images.map(item => '<img src="'+ path + item + '.jpg"/>').join('') + '<div id="indicator-container"></div>').children()[0].classList.add('active')

    $('#miniImg img').css({
        width: '40px',
        height: '40px',
        margin: '0 6px',
        border: '2px solid #fff',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'all .3s linear' 
    }).click(function(e){
        e.stopPropagation();
            let index = $(this).index();
            if(count < index){
                count = $(this).index() - 1;
                changer(1)
            } else {
                count = $(this).index() + 1;
                changer(-1)
            }
           
        
    })

    $('#indicator-container').css({
        position: 'relative',
        width: '100%',
        height: '8px',
        
        background: '#000'
    }).append('<div id="indicator-line"></div><div id="indicator-point"></div>')

    $('#indicator-line').css({
        position: 'absolute',
        width: 0,
        height: '1px',
        background: '#ff0000',
        top: '50%',
        transform: 'translateY(-50%)',
        boxShadow: 'rgb(255 0 0) 0px 0px 3px 1px'
    })
    $('#indicator-point').css({
        position: 'absolute',
        width: '5px',
        height: '5px',
        background: '#ff0000',
        top: '50%',
        transform: 'translateY(-50%)',
        boxShadow: 'rgb(255 0 0) 0px 0px 3px 1px',
        borderRadius: '50%',
        left: 0
    })

    indicator(time)
    
    function changer(numb){
       
        if($('#container').children('img').length <= 1){
            clearTimeout(timer)
            $('#indicator-line').stop()
            $('#indicator-point').stop()

            indicator(time)
            count += numb;
            if(count > images.length - 1) count = 0
            if(count < 0) count = images.length - 1 
            
            selected()
            
        
            $('#container').append('<img  class="img" src="' + path + images[count]+ '.jpg"/>')
            $('#container img').last().css({
                left: -numb * $('#slide').width() + 'px'
            })
            $('#container img').first().css({
                transform: 'rotateY(' + numb * 45  + 'deg)'
            }).animate({
                left: numb * $('#slide').width() + 'px'
            },1500, function() {
    
                $(this).remove();
            });

            $('#container img').animate({
                left: 0
            },1500)
          
            
            timer = setTimeout(changer, time, 1);
           
        } 
      
        
    }

    function indicator(time){   
        $('#indicator-line').css('width', 0).animate({
            width: '100%'
        },time,'linear')
        $('#indicator-point').css('left', 0).animate({
            left: '100%'
        },time,'linear')
    }
    
    function selected(){
        $('#miniImg').children().removeClass('active').eq(count).addClass('active')
    }
    
}) 