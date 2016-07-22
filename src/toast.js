/* 
 * Toast.js
 * https://github.com/yhb241/Toast.js
 */
(function(window, undefined){
	'use strict';
	var document = window.document,
		defaults = {
			type: 'bottom',
			duration: 2000,
			fade: true,
			transparentMask: true,
			loadingDom: '<div class="loading"><div class="loading-item"></div><div class="loading-item"></div><div class="loading-item"></div><div class="loading-item"></div><div class="loading-item"></div><div class="loading-item"></div><div class="loading-item"></div><div class="loading-item"></div><div class="loading-item"></div><div class="loading-item"></div><div class="loading-item"></div><div class="loading-item"></div></div>',
		};
	function createDiv(className){
		var div = document.createElement('div');
		className && div.setAttribute('class', className);
		return div;
	}
	function createElements(){
		var top, toast,
			topClassList = ['pop'],
			content = createDiv('pop-content');
		this.fade === true && topClassList.push('fade');
		this.transparentMask === true && topClassList.push('transparent');
		top = createDiv(topClassList.join(' '));
		switch(this.type){
			case 'bottom':
				toast = createDiv('pop-toast bottom');
				break;
			case 'top':
				toast = createDiv('pop-toast top');
				break;
			case 'loading':
				toast = createDiv('pop-toast');
				break;
			default:
				toast = createDiv('pop-toast bottom');
				break;
		}
		toast.appendChild(content);
		top.appendChild(toast);
		document.body.appendChild(top);
		return top;
	}
	function Toast(opts){
		if(!(this instanceof Toast)) return;
		opts && this.init(opts);
		return this;
	}
	Toast.prototype = {
		init: function(opts){
			for(var pro in defaults){
				this[pro] = defaults[pro];
			}
			this.configure(opts);
			this.context = this.context || createElements.call(this);
			return this;
		},
		// show(content, [duration])
		show: function(){
			var content = arguments[0],
				duration = arguments[1];
			// not initialize
			if(!this.context) return;
			if(this.type === 'loading'){
				this.context.querySelector('.pop-content').innerHTML = this.loadingDom;
			}else{
				duration = duration && typeof duration === 'number' ? duration : this.duration;
				this.context.querySelector('.pop-content').innerHTML = content || '';
				setTimeout(function(){
					this.hide();
				}.bind(this), duration);
			}
			if(this.fade && this.fade === true){
				setTimeout(function(){
					this.context.classList.add('in');
				}.bind(this), 50);
			}
			this.context.style.display = 'block';
		},
		hide: function(evt){
			this.fade && this.fade === true && (this.context.classList.remove('in'));
			this.context.style.display = 'none';
			// In order to directly call
			evt && evt.stopPropagation && evt.stopPropagation();
			evt && evt.preventDefault && evt.preventDefault();
		},
		configure: function(opts){
			if(opts && typeof opts === 'object'){
				if(opts instanceof Object){
					for(var pro in opts){
						this[pro] = opts[pro];
					}
				}
			}
		}
	}
	window.addEventListener('DOMContentLoaded', function(){
		var toastBottom = new Toast().init(),
			loading = new Toast({type: 'loading'});
		this.showToast = toastBottom.show.bind(toastBottom);
		this.showLoading = loading.show.bind(loading);
		this.hideLoading = loading.hide.bind(loading);
	}, false);
})(window);