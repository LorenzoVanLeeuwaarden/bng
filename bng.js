
$( document ).ready(function() {
	console.log('document ready!');

	// setup
	$('input').iCheck({
		checkboxClass: 'icheckbox_flat',
		radioClass: 'iradio_flat'
	});

	// load names
	let names;

	$.get('names.json', function( theNames ) {
		names = theNames;
		console.log('male first names:', names.male.first);
	});

	// getRandomNamePart ('male', 'first')
	const getRandomNamePart = (gender, firstOrLast) => {
		let namePart = names[gender][firstOrLast];
		return namePart[Math.round(Math.random() * (namePart.length - 1))];
	};

	$('button').on('click', {}, () => {
		console.log('button clicked!');

		let firstName = getRandomNamePart('male', 'first');
		let lastName = getRandomNamePart('male', 'last');

		$('#bng').html(firstName + lastName);
	})
});