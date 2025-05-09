import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { OrderPDFData } from "../types";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 5,
    fontSize: 8,
    width: "80mm",
    height: "297mm",
  },
  section: {
    marginBottom: 5,
  },
  header: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  table: {
    width: "100%",
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
    borderBottom: "1px solid #ddd",
  },
  tableHeader: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 8,
    width: "25%",
  },
  tableData: {
    textAlign: "right",
    fontSize: 8,
    width: "25%",
  },
  totalText: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
});

const OrderPDF = ({ orderData }: { orderData: OrderPDFData }) => {
  const { items, tip, total } = orderData;

  return (
    <Document>
      <Page size={{ width: '80mm', height: '297mm' }} style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Orden del Pedido</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Producto</Text>
              <Text style={styles.tableHeader}>Cantidad</Text>
              <Text style={styles.tableHeader}>Precio</Text>
              <Text style={styles.tableHeader}>Total</Text>
            </View>
            {items.map((item) => (
              <View style={styles.tableRow} key={item.id}>
                <Text style={styles.tableData}>{item.name}</Text>
                <Text style={styles.tableData}>{item.quantity}</Text>
                <Text style={styles.tableData}>{item.price}</Text>
                <Text style={styles.tableData}>{item.total}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.totalText}>Subtotal: {total.subtotal}</Text>
          <Text style={styles.totalText}>Propina ({tip}): {total.tip}</Text>
          <Text style={styles.totalText}>Total: {total.total}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrderPDF;





