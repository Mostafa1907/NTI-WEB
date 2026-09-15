
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
    selector: 'app-help',
    imports: [],
    templateUrl: './help.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './help.css'
})
export class Help {
  openIndex = signal<number | null>(0);

  faqs: FaqItem[] = [
    {
      question: 'How long does delivery take?',
      answer:
        'Most orders arrive within 45–90 minutes depending on your area. You can track your order status from the Order History page.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept cash on delivery as well as credit and debit cards. You can choose your preferred method at checkout.',
    },
    {
      question: 'Can I change or cancel my order?',
      answer:
        'Orders can be cancelled while still in "Processing" status. Once an order is on the way, changes are no longer possible.',
    },
    {
      question: 'What if an item is missing or damaged?',
      answer:
        'Contact our support team within 24 hours of delivery with your order number, and we will arrange a refund or replacement.',
    },
    {
      question: 'Do you offer discounts for bulk orders?',
      answer:
        'Yes, business and bulk orders may qualify for special pricing. Reach out to our support team for a custom quote.',
    },
  ];

  toggle(index: number): void {
    this.openIndex.set(this.openIndex() === index ? null : index);
  }
}
