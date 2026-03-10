import { CONFIG } from '../data/config';

export function sendToWhatsApp({ productName, price, emoji = '', customMessage = null }) {
  let message;
  if (customMessage) {
    message = customMessage;
  } else if (productName && price) {
    message = `Olá! Tenho interesse na peça: ${emoji} ${productName} - ${price}. Poderia me dar mais informações?`;
  } else {
    message = CONFIG.defaultMessage;
  }
  const url = `https://wa.me/${CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

export function buildCartMessage(items, formatTotal) {
  const lines = ['Olá! Gostaria de finalizar meu pedido com os seguintes itens:'];
  items.forEach((i) => {
    lines.push(`- ${i.name} x${i.quantity || 1} - ${i.price}`);
  });
  lines.push(`Total: ${formatTotal()}`);
  lines.push('Poderia me dar mais informações?');
  return lines.join('\n');
}
