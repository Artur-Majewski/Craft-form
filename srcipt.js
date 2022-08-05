const form = document.querySelector('form');
const firstName = document.getElementById('first_name');
const lasttName = document.getElementById('last_name');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const startDate = document.getElementById('startDateId');
const endDate = document.getElementById('endDateId');
const description = document.getElementById('00N5r000008S747');
const ProcessingPersonalData = document.getElementById('00N5r000008U6BH');
const AcceptingRegulations = document.getElementById('00N5r000008U6BM');
const PhoneContactConsent = document.getElementById('00N5r000008U6BW');
const MailContactConsent = document.getElementById('00N5r000008U6Bb');

let stat = true;

function setError(input, messagee) {
	const formControl = input.parentElement;
	const errorSpan = formControl.querySelector('span');
	errorSpan.innerText = messagee;
	formControl.className = 'formComponent error';
	stat = false;
}
function setSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'formComponent success';
}

startDate.addEventListener('change', function () {
	document.querySelector('.dateStartInput').value = this.value
		.split('-')
		.reverse()
		.join('/');
});

endDate.addEventListener('change', function () {
	document.querySelector('.dateEndInput').value = this.value
		.split('-')
		.reverse()
		.join('/');
});

form.addEventListener('submit', (event) => {
	stat = true;
	const firstNameValue = firstName.value.trim();
	const lasttNameValue = lasttName.value.trim();
	const phoneValue = phone.value.trim();
	const emailValue = email.value.trim();
	const startDateValue = startDate.value.trim();
	const endDateValue = endDate.value.trim();
	const descriptionValue = description.value.trim();

	if (firstNameValue === '') {
		setError(firstName, 'Pole "Imię" nie może być puste.');
	} else if (!/^[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]+$/.test(firstNameValue)) {
		setError(firstName, 'Pole "Imię" musi zawierać wyłącznie litery.');
	} else {
		setSuccess(firstName);
	}

	if (lasttNameValue === '') {
		setError(lasttName, 'Pole "Nazwisko" nie może być puste.');
	} else if (!/^[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]+$/.test(lasttNameValue)) {
		setError(lasttName, 'Pole "Nazwisko" musi zawierać wyłącznie litery.');
	} else {
		setSuccess(lasttName);
	}

	if (phoneValue === '') {
		setError(phone, 'Pole "Telefon" nie może być puste.');
	} else if (!((phoneValue.length === 9 && /^[0-9]{9}$/.test(phoneValue)) || (phoneValue.length === 12 && /^\+[0-9]{11}$/.test(phoneValue)))) {
		setError(
			phone,
			'Pole "Telefon" musi mieć formułę +48111222333 lub 111222333.'
		);
	} else {
		setSuccess(phone);
	}

	if (emailValue === '') {
		setError(email, 'Pole "Email" nie może być puste.');
	} else if (!emailValue.includes('@')) {
		setError(email, 'Pole "Email" musi zawierać znak "@".');
	} else if (emailValue.includes(' ')) {
		setError(email, 'Pole "Email" musi być ciągiem znaków bez spacji.');
	} else {
		setSuccess(email);
	}

	if (startDateValue === '') {
		setError(startDate, 'Pole "Data rozpoczęcia" nie może być puste.');
	} else if (
		new Date(startDate.value).getTime() + 79199900 <
		new Date().getTime()
	) {
		setError(
			startDate,
			'Data rozpoczęcia nie może być wcześniejsza niż dzisiejsza.'
		);
	} else {
		setSuccess(startDate);
	}

	if (endDateValue === '') {
		setError(endDate, 'Pole "Data zakończenia" nie może być puste.');
	} else if (startDateValue === '') {
		setError(endDate, 'Musisz wybrać datę rozpoczęcia.');
	} else if (
		new Date(endDate.value).getTime() + 79199900 <
		new Date(startDate.value).getTime() + 79199900
	) {
		setError(
			endDate,
			'Data zakończenia nie może być wcześniejsza niż data rozpoczęcia.'
		);
	} else {
		setSuccess(endDate);
	}

	if (descriptionValue === '') {
		setError(description, 'Pole "Opis" nie może być puste.');
	} else if (descriptionValue.length > 1500) {
		setError(description, 'Pole "Opis" może mieć maksymalnie 1500 znaków.');
	} else {
		setSuccess(description);
	}

	if (ProcessingPersonalData.checked === false ||
		AcceptingRegulations.checked === false ||
		PhoneContactConsent.checked === false ||
		MailContactConsent.checked === false) {
		setError(ProcessingPersonalData, 'Wszystkie pola muszą być zaznaczone.');
	} else {
		setSuccess(ProcessingPersonalData);
	}

	if (!stat) {
		event.preventDefault();
	}

	return stat;
});