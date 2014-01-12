require 'sinatra'

get '/' do
	erb :index
end

get '/open/:id' do
	redirect to('http://market.android.com/details?id=com.jnevelson.trackd')
end
