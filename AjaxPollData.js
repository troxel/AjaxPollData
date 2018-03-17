// Polling Constructor Function
function AjaxPollData(url,interval,debug)
{
    // These should be overwritten before calling.
    this.url_src = url;
    this.interval = interval;
    
    this.failed = 0;
    this.success_count = 0;
    
    this.debug = false 
    if ( typeof(debug) != 'undefined' ) { this.debug = true }  // js is ugli 
               
    this.init = function()
    {
       this.getData(this);
    };

    this.continue = function()
    {
       this.tid = setTimeout(this.getData,this.interval,this);
    };

    this.getData = function(cntx)
    {
       var self = cntx;

       jQuery.ajax({
           url        : self.url_src,
           cache: false,
           dataType   : "json",
           context    : self,
           //success    : [self.successHndl,self.success_chain],
           success    : self.successHndlChain,
           error      : self.errorHndl,
       }).done(self.continue);
    };

    // --------------
    this.successHndl = function( data )
    {
        //console.log(this);
        for (var key in data)
        {
            var id = document.getElementById(key);
            if (id)
            {
                id.innerHTML = data[key];
            }
            else
            {
                if ( this.debug ) { console.log("element id not found " + key) }
            }
        }

        //console.log("Success!!!:" + data);
        ++this.success_count;
        delete data;
    };

    this.successHndlChain = [this.successHndl];

    // ---------------
    this.errorHandler = function()
    {
       if ( ++this.failed < 10 )
       {
          this.interval += 1000;
          console.log('error')
          this.continue();
       }
   };
};
