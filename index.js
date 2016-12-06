(function(){
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
        
        this.getHolderDimensions = function(){
            var width,height;
            width = containerHolder.clientWidth > containerHolder.clientHeight ? containerHolder.clientHeight : containerHolder.clientWidth;
            height = containerHolder.clientHeight;
            return {'width': width , 'height': height };
        }
        
        this.setElementDimensions = function(){
            var dimensions = this.getHolderDimensions();
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
            
            
        }
        
        this.setTime = function(){
            var hourHand , minuteHand , secondHand,handLength,hiddenChild,vissibleChild,docfrag,secDeg,minDeg,hourDeg;
            secDeg=0;
            minDeg=0;
            hourDeg=0;
            docfrag = document.createDocumentFragment();
            handLength = Math.abs( this.getHolderDimensions().width);
            console.log(handLength);
            hourHand = document.createElement('DIV');
            minuteHand = document.createElement('DIV');
            secondHand = document.createElement('DIV');
            hiddenChild = document.createElement('DIV');
            vissibleChild = document.createElement('DIV');
            hiddenChild.className = 'hidden_hand'; 
            vissibleChild.className = 'visible_hand'; 
            hiddenChild.style.width =  handLength/2 + 'px'; 
            vissibleChild.style.width =  handLength/2 + 'px';
            hiddenChild.style.backgroundColor = options.color || '#000';
            vissibleChild.style.backgroundColor = options.handColor || '#fff';
            hiddenChild.style.height = '100%';
            hiddenChild.style.float = 'left';
            vissibleChild.style.height = '100%';
            vissibleChild.style.display = 'left';
            
            
            hourHand.className = 'hour_hand';
            minuteHand.className = 'minute_hand';
            secondHand.className = 'second_hand';
            hourHand.style.width =  handLength - Math.abs(handLength/20) + 'px'; 
            hourHand.style.height =  Math.abs(handLength/20) + 'px';
            hourHand.style.backgroundColor = options.handColor || '#fff';
            hourHand.style.position = 'absolute';
            hourHand.style.top = (handLength/2) - (Math.abs(handLength/20)/ 2) + 'px';
            minuteHand.style.width =  handLength - Math.abs(handLength/25)+ 'px'; 
            minuteHand.style.height =  Math.abs(handLength/25) + 'px';
            minuteHand.style.backgroundColor = options.handColor || '#fff';
            minuteHand.style.position = 'absolute';
            minuteHand.style.top = (handLength/2) - (Math.abs(handLength/25)/ 2) + 'px';
            secondHand.style.width =  handLength - Math.abs(handLength/30) + 'px'; 
            secondHand.style.height =  Math.abs(handLength/30) + 'px';
            secondHand.style.backgroundColor = options.handColor || '#fff';
            secondHand.style.position = 'absolute';
            secondHand.style.top = (handLength/2) - (Math.abs(handLength/30)/ 2) + 'px';
            
            
            docfrag.appendChild(hiddenChild);
            docfrag.appendChild(vissibleChild);
            hourHand.appendChild(docfrag.cloneNode(true));
            minuteHand.appendChild(docfrag.cloneNode(true));
            secondHand.appendChild(docfrag.cloneNode(true));
            
            container.appendChild(hourHand);
            container.appendChild(minuteHand);
            container.appendChild(secondHand);
            var curdate = new Date();
            secDeg = ( curdate.getHours() + curdate.getMinutes()/60 ) / 12 * 360;
            minDeg = curdate.getMinutes() / 60 * 360;
            hourDeg = ( curdate.getSeconds() + curdate.getMilliseconds()/1000 ) /60 * 360;
            secondHand.style.transform = 'rotate('+(secDeg <= 360 ? secDeg+=6 : 0)+'deg)';
            minuteHand.style.transform = 'rotate('+(minDeg <= 360 ? minDeg+=6 : 0)+'deg)';
            hourHand.style.transform = 'rotate('+(hourDeg <= 360 ? hourDeg+=6 : 0)+'deg)';

            setInterval(function(){
                secondHand.style.transform = 'rotate('+(secDeg <= 360 ? secDeg+=6 : 0)+'deg)';
            },1000)
            setInterval(function(){
                minuteHand.style.transform = 'rotate('+(minDeg <= 360 ? minDeg+=6 : 0)+'deg)';
            },60000)
            setInterval(function(){
                hourHand.style.transform = 'rotate('+(hourDeg <= 360 ? hourDeg+=6 : 0)+'deg)';
            },3600000)
            }
        
        this.setElementDimensions();
        this.setTime();
        
        
    }
}())