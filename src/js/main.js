import './vendor';

$(document).ready(() => {
	let slider = $('.owl-carousel');
	let link = $('.header-nav a[href^="#"], .mobile-menu-list a[href^="#"]');
	let home = $('.home');

	slider.owlCarousel({
		dots: true,
		items: 1,
		autoplay: true,
		loop: true,
		LazyLoad: true,
		autoplayTimeout: 6000,
		onTranslated  : callback,
		onInitialized: callback,
		onDragged: callback,
		onChanged: callback,
		onRefresh: callback,
		navText: [
			'<svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6.01216L5.33323 0L6 0.751354L0.666766 6.76351L0 6.01216Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0.66437 5.25847L5.98023 11.251L5.31586 12L0 6.00782L0.66437 5.25847Z" fill="white"/></svg>',
			'<svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 6.01216L0.666767 0L0 0.751354L5.33323 6.76351L6 6.01216Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.33563 5.25847L0.0197691 11.251L0.68414 12L6 6.00782L5.33563 5.25847Z" fill="white"/></svg>'
		],
		responsiveClass: true,
		responsive: {
			0:{
				nav: true,
			},
			768:{
				nav: false,
			}
		}
	});

	function callback() {
		$('.owl-item').each(function () {
			if ($(this).hasClass('active')) {
				$(this).find('.opacity-text').addClass('active');
				$(this).find('.opacity-price').addClass('active');
			} else {
				$(this).find('.opacity-text').removeClass('active');
				$(this).find('.opacity-price').removeClass('active');
			}
		});
	};

	$(function(){
		link.on('click', function(event) {
			event.preventDefault();
			var sc = $(this).attr("href"),
				dn = $(sc).offset().top;
			$('html, body').animate({scrollTop: dn}, 1000);
			$('.mobile-menu__open').removeClass('active');
		});
	});

	home.click(function(e) {
		e.preventDefault();
		$('body,html').animate({
			scrollTop : 0
		}, 1000);
	});

	if ($(window).width() > 768) {
		$(window).scroll(function(){
			if ($(window).scrollTop() > 200) {
				$('.header-fixed').addClass('fixed');
			}
			else {
				$('.header-fixed').removeClass('fixed');
			}
		});
	}

	if ($(window).width() > 767) {
		var contactHeight = $('.contact-info').innerHeight();
		var totalHeight = contactHeight + 68;
		$('.contact-map').height(totalHeight);
	};

	$('select').each(function () {
		var $this = $(this);
		var numberOfOptions = $(this).children("option").length;

		$this.addClass('select-hidden');
		$this.wrap('<div class="select"></div>');
		$this.after('<div class="select-styled"></div>');

		var $styledSelect = $this.next('div.select-styled');

		$styledSelect.text($this.children('option').eq(0).text());

		var $list = $('<ul />', {
			class: "select-options"
		}).insertAfter($styledSelect);

		for (var _i = 0; _i < numberOfOptions; _i++) {
			$('<li />', {
				text: $this.children('option').eq(_i).text(),
				rel: $this.children('option').eq(_i).attr('value')
			}).appendTo($list);
		}

		$list.click(function (e) {
			$(this).closest('.select').removeClass('active')
		})

		var $listItems = $list.children('li');

		$styledSelect.click(function (e) {
			e.stopPropagation();
			$('div.select-styled.active').not(this).each(function () {
				$(this).removeClass('active').next('ul.select-options').hide();
			});
			$(this).toggleClass('active').next('ul.select-options').toggle();
		});

		$listItems.click(function (e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass('active');

			$this.val($(this).attr('rel'));

			$styledSelect.show();
			$(this).closest('.select').removeClass('active');
			$list.hide();
			$this.trigger('change').change();
		});
	});

	$('.modal-select .select, .select-styled').on('click', function () {
		$(this).toggleClass('active');
		$(this).closest('.select').toggleClass('active')
	});

	$("#dtBox").DateTimePicker({
		isPopup: false,
		buttonsToDisplay: ["HeaderCloseButton"],
		shortDayNames: [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
		fullDayNames: [ "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
		shortMonthNames: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
		fullMonthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
		titleContentDate: "Установить дату",
		defaultDate: new Date(),
		minDate: new Date(),
		setValueInTextboxOnEveryClick: true,
		dateFormat: "dd-MM-yyyy",
		formatHumanDate: function(sDate)
		{
			return sDate.dd + " . " + sDate.MM + " . " + sDate.yyyy;
		},

	});

	$(document).on('focus', '.input-style input', function(e){
		var $this = $(this);
		var parent = $this.closest('.input-style');
		var label = parent.find("label");

		parent.addClass("focused");

		if ($this.val() !== "") {
			label.show();
		}
	});
	$(document).on('blur focusout', '.input-style input', function(e){
		var $this = $(this);
		var parent = $this.closest('.input-style');
		var label = parent.find("label");

		if ($this.val() === "") {
			parent.removeClass("focused");
		}
		if ($this.val() !== "") {
			parent.removeClass("focused");
			label.hide();
		}
	});
	$(document).on('change', '.input-style input', function(e){
		var $this = $(this);
		var parent = $this.closest('.input-style');
		var label = parent.find("label");

		if ($this.val() !== "") {
			label.hide();
			parent.removeClass("focused");
		} else {
			label.show();
		}
	});

	let onlyNumber = function onlyNumber(e) {
		let key = e.charCode || e.keyCode || 0;

		if (
			key === 8 ||
			key === 9 ||
			key === 13 ||
			key === 46 ||
			key === 110 ||
			key === 190 ||
			key >= 35 && key <= 40
		) {
		} else if (key >= 48 && key <= 57 || key >= 96 && key <= 105) {
		} else {
			e.preventDefault();
		}
	};
	let $phone = $('input[type="tel"]');

	$phone.keydown(onlyNumber);

	$('#time').keydown(function () {
		$('.modal-date').removeClass('active');
	});

	$('.modal-date').on('click', function () {
		$(this).addClass('active');
	});
	jQuery(function($){
		$(document).mouseup(function (e){
			var div = $(".dtpicker-overlay");
			var modalWrap = $('.modal-wrapper, #dtBox');
			if (!div.is(e.target) && div.has(e.target).length === 0) {
				$('.modal-date').removeClass('active');
			}
			if (!modalWrap.is(e.target) && modalWrap.has(e.target).length === 0) {
				$('.modal').fadeOut();
			}
		});
	});

	$('.service-link a ').on('click', function (e) {
		e.preventDefault();
		$('.modal-to').fadeIn();
	});

	$('.stock-link a').on('click', function (e) {
		e.preventDefault();
		$('.modal-stock').fadeIn();
	});

	$('.close').on('click', function () {
		$('.modal-to, .modal-stock').fadeOut();
	});

	$('.mobile-burger').on('click', function () {
		$('.mobile-menu__open').addClass("active");
	});
	$('.mobile-menu__close').on('click', function () {
		$('.mobile-menu__open').removeClass("active");
	});
	$('.mobile-menu__home').on('click', function (e) {
		e.preventDefault();
		$('body,html').animate({
			scrollTop : 0
		}, 1000);
		$('.mobile-menu__open').removeClass("active");
	});
});
