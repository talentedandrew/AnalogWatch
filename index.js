(function(window){
    this.Watch = function(element,options){
        var container,containerHolder,defaultOptions;
        options = options || {};
        container = document.getElementById(element);
        console.log(container);
        containerHolder = container.parentElement;
        console.log(containerHolder);
        
        if(element && typeof options !== "object"){
            throw new Error('Unsupported arguments passed'+options);
        }
        else if(!element && typeof options === "object"){
            throw new Error('Cannot find the element with id '+element);
        }
        else if(!element && typeof options !== "object"){
            throw new Error('Please pass the id of the watch element');
        }
        
        function getHolderDimensions(){
            var width,height;
            width = containerHolder.clientWidth > containerHolder.clientHeight ? containerHolder.clientHeight : containerHolder.clientWidth;
            height = containerHolder.clientHeight;
            return {'width': width , 'height': height };
        }
        
        function setElementDimensions(){
            var dimensions = getHolderDimensions();
            container.style.height = dimensions.height + 'px';  
            container.style.width = dimensions.width + 'px';
            container.style.position='absolute';
            container.style.margin = 'auto';
            container.style.left = '0';
            container.style.right = '0';
            container.style.top = '0';
            container.style.bottom = '0';
            container.style.backgroundColor = options.color || '#000';
            container.style.borderRadius = '50%';
            container.innerHTML = '';
            setTime();
        
            
        }
        function createHandElement(className,length,maxDim){
            var element = document.createElement('DIV'); 
            element.className = className;
            element.style.height =  length - Math.abs(2*(length/maxDim))  + 'px'; 
            element.style.width =  Math.abs(length/maxDim) + 'px';
            element.style.backgroundColor = 'transparent';
            element.style.position = 'absolute';
            //element.style.top = (length/2) - (Math.abs(length/maxDim)/ 2) + 'px';
            element.style.top='0px';
            element.style.bottom='0px';
            element.style.left='0px';
            element.style.right='0px';
            element.style.margin = 'auto';
            return element;
        }
        function createChildHandelement(className,length,color){
            var element = document.createElement('DIV');
            element.className = className; 
            element.style.height =  length/2 + 'px'; 
            element.style.backgroundColor = color || '#000';
            element.style.width = '100%';
            element.style.float = 'left';
            
            return element;
            
        }
        
        function setTime(){
            var hourHand , minuteHand , secondHand,handLength,hiddenChild,vissibleChild,docfrag,secDeg,minDeg,hourDeg;
            secDeg=0;
            minDeg=0;
            hourDeg=0;
            docfrag = document.createDocumentFragment();
            handLength = Math.abs( getHolderDimensions().width);
            console.log(handLength);
            
            hourHand = createHandElement('hour_hand',handLength,20)
            minuteHand = createHandElement('minute_hand',handLength,25)
            secondHand = createHandElement('second_hand',handLength,30)
            vissibleChild = createChildHandelement('visible_hand',handLength,options.handColor);
            hiddenChild = createChildHandelement('hidden_hand',handLength,'transparent');    
            docfrag.appendChild(vissibleChild);
            docfrag.appendChild(hiddenChild);
            
            hourHand.appendChild(docfrag.cloneNode(true));
            minuteHand.appendChild(docfrag.cloneNode(true));
            secondHand.appendChild(docfrag.cloneNode(true));
            
            container.appendChild(hourHand);
            container.appendChild(minuteHand);
            container.appendChild(secondHand);
            
            var curdate = new Date();
            
            hourDeg = ( (curdate.getHours() > 12 ? curdate.getHours() - 12 : curdate.getHours())  + curdate.getMinutes()/60 ) / 12 * 360;
            minDeg = curdate.getMinutes() / 60 * 360;
            secDeg = ( curdate.getSeconds() + curdate.getMilliseconds()/1000 ) /60 * 360;
            
            secondHand.style.transform = 'rotate('+(secDeg <= 360 ? secDeg : secDeg = 12)+'deg)';
            minuteHand.style.transform = 'rotate('+(minDeg <= 360 ? minDeg : minDeg = 12)+'deg)';
            hourHand.style.transform = 'rotate('+(hourDeg <= 360 ? hourDeg : hourDeg = 2/5)+'deg)';
            
            setInterval(function(){
                secondHand.style.transform = 'rotate('+(secDeg <= 360 ? secDeg+=6 : secDeg = 12)+'deg)';
            },1000)
            setInterval(function(){
                minuteHand.style.transform = 'rotate('+(minDeg <= 360 ? minDeg+=6 : minDeg = 12)+'deg)';
                hourHand.style.transform = 'rotate('+(hourDeg <= 360 ? hourDeg+=1/5 : hourDeg = 2/5)+'deg)';
            },60000)
        }
        setElementDimensions();
         
        window.onresize = function(){
            setElementDimensions();
        }
        
    }
}(typeof window !== "undefined" ? window : this));