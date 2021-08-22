$(document).ready(function(){
    let images = ['dubai','koshka','maldivi','ozero','tayga','vecher','voda','zakat'];
    let path = 'img/';
    let count = 0;
    let time = setTimeout(change, 2000);
    document.body.innerHTML += '<style> .active{transform: scale(1.2) translateY(-5px)}'
    $('#slide')
        .css({
            position: 'relative',
            width: '90%',
            height: '70vh',
            border: '1px solid #666',
            margin: 'auto',
            boxShadow: '0 3px 15px #666',
            borderRadius: '5px',
            
        }).html('<div id="image"><div id="numb"></div></div><div id="miniImg"></div>')
        .click(function(e){
           if(e.clientX > 970) change(1);
           else if(e.clientX < 390) change(-1);
        
        })

    $('#image')
        .css({
            position: 'relative',
            width: '100%',
            height: '100%',
            background: 'center/cover',
            backgroundImage: 'url("' + path + images[count] +'.jpg")'
        })

    $('#miniImg').css({
        position: 'absolute',
        width: '80%',
        height: '30px',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center'
        
    }).html(images.map((item, index) => '<img data-index ="'+index+'"  class="img" src="' +  path + item +'.jpg"/>'))

    $('.img:first-child').addClass('active')
    $('.img').css({
        border: '2px solid #fff',
        width:'40px', 
        height:'40px', 
        objectFit: 'cover',
        borderRadius:'50%',
        margin: '0 5px',
        cursor: 'pointer',
        transition: 'transform .2s linear'
    }).click(function (){
        count = +$(this).attr('data-index');       
        change(0);
       
    })
    
    $('#numb').css({
        position: 'absolute',
        border: '2px solid #ccc',
        borderRadius: '5px',
        left: '5px',
        top: '5px',
        textAlign: 'center',
        font: '900 1.5em "Open-sans"',
        padding: '5px 10px',
        color: '#fff',
        boxShadow: '0 3px 10px #ccc inset',
        textShadow: '0 0 10px #ff0000'
    }).html('1/8')
   
    function change(dir = 1){
        clearTimeout(time)
        count += dir;
        if(count > images.length - 1) count = 0;
        if(count < 0 ) count = images.length - 1;
        $('.img').removeClass('active');
        $('.img[ data-index="'+ count +'"]').addClass('active');
        $('#numb').html((count + 1) + '/' + images.length)
        $('#image')
        .fadeOut('slow',function(){
            $(this).css({
                backgroundImage:'url("' + path + images[count] +'.jpg")'
            }).fadeIn('slow')
            time = setTimeout(change, 2000) 
        })

        
      
    }

    

    
})