import { Row, Col, Card } from "antd";
import { useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getOrderListAction } from "../../../redux/actions";
import "./styles.scss";

function DashboardPage() {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderReducer.orderList);

  useEffect(() => {
    dispatch(getOrderListAction({}));
  }, []);

  let confirmedCount = 7;
  let waitingCount = 2;
  let cancelledCount = 10;
  let totalRevenue = 0;

  orderList.data.forEach((item) => {
    if (item.status === 1) {
      waitingCount += 1;
    } else if (item.status === 2) {
      confirmedCount += 1;
    } else {
      cancelledCount += 1;
    }
    totalRevenue += parseInt(item.totalPrice);
  });

  const stateLine = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Doanh Thu",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [65, 70, 80, 81, 90],
      },
    ],
  };

  const stateDoughnut = {
    labels: ["Đã Hoàn Thành", "Chờ Xác Nhận", "Đã Hủy"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#2FDE00", "#C9DE00", "#B21F00"],
        hoverBackgroundColor: ["#175000", "#4B5000", "#501800"],
        data: [confirmedCount, waitingCount, cancelledCount],
      },
    ],
  };

  return (
    <main className="dashboard-page">
      <p className="dashboard-page__title">Thống Kê</p>
      <Row gutter={16}>
        <Col span={14} className="dashboard-page__chart">
          <Line
            data={stateLine}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </Col>
        <Col span={10} className="dashboard-page__chart">
          <Row justify="center">
            <Doughnut
              data={stateDoughnut}
              className="dashboard-page__chart--doughnut"
              options={{
                title: {
                  display: true,
                  text: "Tổng đơn hàng",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </Row>
        </Col>
      </Row>
      <Row
        gutter={16}
        justify="space-around"
        className="dashboard-page__statistical"
      >
        <Col span={4}>
          <Card
            title="Tổng Doanh Thu"
            bordered={true}
            className="dashboard-page__statistical--item"
          >
            ${totalRevenue}
          </Card>
        </Col>
        <Col span={4}>
          <Card
            title="Khách Truy Cập"
            bordered={true}
            className="dashboard-page__statistical--item"
          >
            54.345
          </Card>
        </Col>
        <Col span={4}>
          <Card
            title="Hôm Nay"
            bordered={true}
            className="dashboard-page__statistical--item"
          >
            $3.868
          </Card>
        </Col>
        <Col span={4}>
          <Card
            title="Khách Định Kỳ"
            bordered={true}
            className="dashboard-page__statistical--item"
          >
            4.857
          </Card>
        </Col>
      </Row>
    </main>
  );
}

export default DashboardPage;
