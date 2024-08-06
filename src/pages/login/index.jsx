import {Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Input, Label, Row} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import axios from "../../api/";
import {useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const {control, handleSubmit} = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const login = async (values) => {
        setIsLoading(true)
        try {
            const data = await axios.post('login', values)
            localStorage.setItem('token', data.token)
            toast.success(data.message)
            navigate('/roles')
        } catch (e) {
            toast.error(e.response.data.message)
        } finally {
            setIsLoading(false)
        }

    }

    return <Container className="mt-5">
        <Row className="justify-content-center">
            <Col sm={12} md={4}>
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit(login)}>
                            <Controller rules={{required: true}}
                                        render={({field: {value, onChange}, fieldState: {error}}) => (
                                            <div>
                                                <Label htmlFor="email">Email</Label>
                                                <Input name="email" id="email" type="email" value={value}
                                                       onChange={onChange} invalid={error}/>
                                            </div>
                                        )} name="email" control={control}/>
                            <Controller rules={{required: true}}
                                        render={({field: {value, onChange}, fieldState: {error}}) => (
                                            <div>
                                                <Label htmlFor="password">Password</Label>
                                                <Input name="password" id="password" type="password" value={value}
                                                       onChange={onChange} invalid={error}/>
                                            </div>
                                        )} name="password" control={control}/>
                            <Button disabled={isLoading} color="success" type="submit" className="mt-3 w-100">
                              
                              Login
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
}

export default Login