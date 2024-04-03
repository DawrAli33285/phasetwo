import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PdfDocument = ({ personalData, sections }) => (
  <Document>
    <Page size="A4">
      <View style={styles.container}>
        <Text style={styles.title}>{personalData.name}</Text>
        {/* Render other personal data here */}
        {sections.map((section, index) => (
          <View key={index}>
            <Text>{section.title}</Text>
            <Text>{section.content}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default PdfDocument;
