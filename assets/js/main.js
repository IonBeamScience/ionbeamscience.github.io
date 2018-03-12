/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Touch?
			if (skel.vars.mobile)
				$body.addClass('is-touch');

		// Forms.
			var $form = $('form');

			// Auto-resizing textareas.
				$form.find('textarea').each(function() {

					var $this = $(this),
						$wrapper = $('<div class="textarea-wrapper"></div>'),
						$submits = $this.find('input[type="submit"]');

					$this
						.wrap($wrapper)
						.attr('rows', 1)
						.css('overflow', 'hidden')
						.css('resize', 'none')
						.on('keydown', function(event) {

							if (event.keyCode == 13
							&&	event.ctrlKey) {

								event.preventDefault();
								event.stopPropagation();

								$(this).blur();

							}

						})
						.on('blur focus', function() {
							$this.val($.trim($this.val()));
						})
						.on('input blur focus --init', function() {

							$wrapper
								.css('height', $this.height());

							$this
								.css('height', 'auto')
								.css('height', $this.prop('scrollHeight') + 'px');

						})
						.on('keyup', function(event) {

							if (event.keyCode == 9)
								$this
									.select();

						})
						.triggerHandler('--init');

					// Fix.
						if (skel.vars.browser == 'ie'
						||	skel.vars.mobile)
							$this
								.css('max-height', '10em')
								.css('overflow-y', 'auto');

				});

			// Fix: Placeholder polyfill.
				$form.placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Menu.

			var $menu = $('#menu');
			// $可以是个函数，也可以是个对象，它具体是什么意思，取决于你所引用的框架是怎么定义$的。
			// 比如：如果你引用的是jquery框架。那么$("menu")表示，名为menu的元素对象。即<menu>***</menu>。
			// 楼上说的id为menu的元素，则表示为$("#menu")
			// 你可以这样理解：
			// 				  $=document.getElmentById;
			// 				  var a=$("menu");
			// 				  相当于：
			// 				  var a=document.getElmentById("menu");
				  
			$menu.wrapInner('<div class="inner"></div>');

			$menu._locked = false;

			$menu._lock = function() {

				if ($menu._locked)
					return false;

				$menu._locked = true;

				window.setTimeout(function() {
					$menu._locked = false;
				}, 350);

				return true;

			};

			$menu._show = function() {

				if ($menu._lock())
					$body.addClass('is-menu-visible');

			};

			$menu._hide = function() {

				if ($menu._lock())
					$body.removeClass('is-menu-visible');

			};

			$menu._toggle = function() {

				if ($menu._lock())
					$body.toggleClass('is-menu-visible');

			};

			//================若没有此段代码，点击menu后，弹出的菜单会跟正文一样蒙上一层灰板 
			$menu
				.appendTo($body)
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						if (href == '#menu')
							return;

						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				})
				.append('<a class="close" href="#menu">Close</a>');
			//================若没有此段代码，点击menu后，菜单不弹出
			$body
				.on('click', 'a[href="#menu"]', function(event) {

					event.stopPropagation();
					event.preventDefault();

					// Toggle.
						$menu._toggle();

				})
				// .on('click', function(event) {

				// 	// Hide.
				// 		$menu._hide();

				// })
				// .on('keydown', function(event) {

				// 	// Hide on escape.
				// 		if (event.keyCode == 27)
				// 			$menu._hide();

				// });



		    // nav收缩展开
		    $('.nav-item>a').on('click',function(){
		        if (!$('.nav').hasClass('nav-mini')) {
		            if ($(this).next().css('display') == "none") {
		                //展开未展开
		                $('.nav-item').children('ul').slideUp(300);
		                $(this).next('ul').slideDown(300);
		                $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
		            }else{
		                //收缩已展开
		                $(this).next('ul').slideUp(300);
		                $('.nav-item.nav-show').removeClass('nav-show');
		            }
		        }
		    });

    

	});

})(jQuery);