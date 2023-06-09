import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Box from "@mui/material/Box";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { Link as RouterLink } from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import { ajax } from "../../lib/http";
import CommonView from "../../components/view/common";

export const loader = async ({ params }) => {
    const response = await ajax(`/ge/${params.id}`);
    return response;
};

export const Component = () => {
    const data = useLoaderData();
    const columns = [
        { field: "name", headerName: "名称", width: 250 },
        {
            field: "provider",
            headerName: "提供方",
            width: 150,
            renderCell: (item) => {
                return (
                    <Link underline={"hover"} color={"inherit"} component={"a"} href={item.value.url}>{item.value.name}</Link>
                );
            }
        },
        {
            field: "status",
            headerName: "状态",
            width: 120,
            renderCell: (item) => {
                return (
                    item.value === 200 ?
                        <>
                            <DoneIcon fontSize={"small"} color={"success"} />
                            <Button variant={"text"} size={"small"} sx={{ marginLeft: 2 }} component={"a"} href={item.row.url}>访问</Button>
                        </> :
                        <ClearIcon fontSize={"small"} color={"error"} />
                )
            }
        }
    ]
    return (
        <CommonView title={data.name} image={data.image}>
            <Stack spacing={2}>
                <Breadcrumbs>
                    <Link underline={"hover"} color={"inherit"} component={RouterLink} to={"/ge"}>点兔展会</Link>
                    <Link underline={"hover"} component={RouterLink} to={`/ge/${data.id}`}>{data.name}</Link>
                </Breadcrumbs>
                <Typography variant={"h4"}>{data.name}</Typography>
                <Typography variant={"h5"}>可用镜像</Typography>
                <Box sx={{ height: 500, width: "100%" }}>
                    <DataGrid rows={data.endpoint} columns={columns} />
                </Box>
            </Stack>
        </CommonView>
    );
}
