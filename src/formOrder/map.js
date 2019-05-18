import React from 'react';

export default class Map extends React.Component {
   
    frame = React.createRef();

    componentDidMount(){
        let fra = this.frame.current.contentWindow.document;
        let ele = (<script>
        document.domain = document.domain;
        </script>);
        fra.body.append(ele)
        console.log(fra.getElementById('map'))
        if(fra.getElementById('map')){
            fra.getElementById('map').addEventListener('click', ()=>{
                console.log('click')
            })
        }
    }

    changeHangler = (e) => {
        console.log('click')
        let fra = this.frame.current.contentWindow
        console.log(this.frame.current.contentWindow.document.getElementById('details'))
        console.log(fra.document.getElementById('map'))
    }

    onLoadHandler = () => {
        console.log('load')
        let fra = this.frame.current.contentWindow
        /*fra.document.addEventListener('click', ()=>{
            console.log('click')
        })*/
        //console.log(this.frame.current.contentWindow.document.getElementById('details'))
        //console.log(fra.document.getElementById('map'))
    }

    render(){
        return(
            <iframe 
                src="https://chooser.dpd.ru/?widgetid=15581649352781&amp;type=dpdclient&amp;address=%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&amp;viewdistance=100&amp;filter_postamat=1&amp;choose=1&amp;width=100%25&amp;sid=JicnJiclIicmJGsvJyAhLlJSLicvJFUlUS8jJyQuVScjIiJSJ1UvICIuVSYiIVQgJyRVEA%3D%3D"  
                id="__DPDCHOOSER_IFRAME" 
                name="DPDChooser" 
                scrolling="no"
                className='frame'
                ref={this.frame}
                onClick= {this.changeHangler}
                onLoad={this.onLoadHandler}
            >
                NO IFRAME SUPPORT
            </iframe>
        );
    }
}