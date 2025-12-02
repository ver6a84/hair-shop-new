import styles from './PromoModal.module.css';
import Icon from './icon';
import { useState } from 'react';	

export default function PromoModal({ setShowModal }) {
	const [showMessage, setShowMessage] = useState(false);
	const [message, setMessage] = useState('');
	const [isError, setIsError] = useState(false);
	
	const baseUrlV2 =	 'https://api.perukytyt.com/v2'

	async function getPromo(e) {	
		e.preventDefault();
		const response = await fetch(`${baseUrlV2}/promos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: e.target.email.value
			})
		});
		const data = await response.json();
		if (!response.ok) {
			setMessage(data.message);
			setShowMessage(true);
			setIsError(true);
			return;
		}
		setMessage(data.message);
		setShowModal(false);
		setShowMessage(true);
	}
	
	return (
		<form 
		className={styles.promoModal}
		onSubmit={getPromo}>
			<p className={styles.promoText}>Отримайте знижку<span>10%</span>на перше замовлення</p>
			<input 
			type="email"
			name='email'
			placeholder='Напишіть Ваш email'
			required
			/>
			<button className={styles.promoClose} type="button" onClick={() => setShowModal(false)}><Icon name="close" size={12}/></button>
			<button 
			className={styles.promoSubmit} 
			type="submit"
			>Отримати знижку
			</button>
			{showMessage &&
			<p className={`${styles.promoMessage} ${isError ? styles.error : ''}`}>{message}</p>
			}
		</form>
	);
}